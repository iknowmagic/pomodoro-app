import { useTimerStore } from '../store/timerStore'
import { updateFavicon } from './faviconUtils'
import { useState, useCallback, useEffect, useRef } from 'react'

export type TimerType = 'pomodoro' | 'shortBreak' | 'longBreak'

/**
 * Custom hook for timer functionality
 * @returns Timer controls and states
 */
export const useTimer = () => {
  const timerStore = useTimerStore()
  const [isActive, setIsActive] = useState(false)
  const [shouldResume, setShouldResume] = useState(false)

  // Use a ref for the interval ID to avoid re-renders when it changes
  const intervalIdRef = useRef<number | null>(null)

  // Update percentage and favicon
  const updatePercentage = useCallback(() => {
    const duration = timerStore.timerMap[timerStore.timerType].duration
    const percentage = Math.floor((timerStore.timer / duration) * 100)

    if (percentage !== timerStore.percentage) {
      timerStore.setPercentage(percentage)
      updateFavicon(percentage)
    }
  }, [timerStore])

  // Format timer for display
  const timerToDisplay = useCallback(() => {
    const minutes = Math.floor(timerStore.timer / 60)
    const seconds = timerStore.timer % 60

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    if (!timerStore.showSeconds) {
      // Fix: Only return minutes without seconds when showSeconds is false
      return formattedMinutes
    }

    return `${formattedMinutes}:${formattedSeconds}`
  }, [timerStore.timer, timerStore.showSeconds])

  // Clear any existing interval
  const clearTimerInterval = useCallback(() => {
    if (intervalIdRef.current !== null) {
      window.clearInterval(intervalIdRef.current)
      intervalIdRef.current = null
    }
  }, [])

  // Handle timer completion
  const handleTimerComplete = useCallback(() => {
    clearTimerInterval()

    if (timerStore.timerType === 'pomodoro') {
      timerStore.incrementSessions()
      if (timerStore.pomodoros < 4) {
        timerStore.incrementPomodoros()
        timerStore.setTimerType('shortBreak')
      } else {
        timerStore.resetPomodoros()
        timerStore.setTimerType('longBreak')
      }
    } else {
      timerStore.setTimerType('pomodoro')
    }

    // Reset timer to the new duration
    const newDuration = timerStore.timerMap[timerStore.timerType].duration
    timerStore.setTimer(newDuration)
    updatePercentage()

    if (!timerStore.autoMode) {
      setIsActive(false)
    }
  }, [timerStore, clearTimerInterval, updatePercentage])

  // Control timer: Start
  const start = useCallback(() => {
    setIsActive(true)
    setShouldResume(false)
    localStorage.setItem('timerActive', 'true')
  }, [])

  // Control timer: Stop
  const stop = useCallback(() => {
    setIsActive(false)
    localStorage.setItem('timerActive', 'false')
  }, [])

  // Control timer: Reset
  const reset = useCallback(() => {
    clearTimerInterval()
    const duration = timerStore.timerMap[timerStore.timerType].duration
    timerStore.setTimer(duration)
    updatePercentage()
    setIsActive(false)
    setShouldResume(false)
    localStorage.setItem('timerActive', 'false')
  }, [timerStore, clearTimerInterval, updatePercentage])

  // Initialize timer with type
  const initTimer = useCallback(
    (type: TimerType) => {
      clearTimerInterval()
      timerStore.setTimerType(type)
      const duration = timerStore.timerMap[type].duration
      timerStore.setTimer(duration)
      updatePercentage()

      if (timerStore.autoMode) {
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    },
    [timerStore, clearTimerInterval, updatePercentage],
  )

  // Handle active state changes
  useEffect(() => {
    if (isActive && timerStore.timer > 0) {
      // Clear any existing interval before creating a new one
      clearTimerInterval()

      // Create new interval - this is the critical section
      intervalIdRef.current = window.setInterval(() => {
        // Get the current timer value
        const currentTimer = timerStore.timer
        const newValue = currentTimer - 1

        // Check if timer reached zero
        if (newValue <= 0) {
          handleTimerComplete()
          timerStore.setTimer(0)
        } else {
          timerStore.setTimer(newValue)
        }
      }, 1000)
    } else {
      clearTimerInterval()
    }

    return clearTimerInterval
  }, [isActive, clearTimerInterval, handleTimerComplete, timerStore]) // Added timerStore

  // Update percentage when timer changes
  useEffect(() => {
    updatePercentage()
  }, [timerStore.timer, updatePercentage])

  // Load saved state on mount (once)
  useEffect(() => {
    const savedTimerActive = localStorage.getItem('timerActive')
    const savedTimer = localStorage.getItem('timer')
    const savedTimerType = localStorage.getItem('timerType')

    if (savedTimer && savedTimerType) {
      timerStore.setTimer(parseInt(savedTimer, 10))
      timerStore.setTimerType(savedTimerType as TimerType)
      updatePercentage()

      if (savedTimerActive === 'true' && parseInt(savedTimer, 10) > 0) {
        setShouldResume(true)
      }
    }

    // Save timer state before unload
    const handleBeforeUnload = () => {
      localStorage.setItem('timer', timerStore.timer.toString())
      localStorage.setItem('timerType', timerStore.timerType)
      localStorage.setItem('timerActive', isActive ? 'true' : 'false')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array - runs only on mount

  return {
    timerToDisplay,
    start,
    stop,
    reset,
    isActive,
    shouldResume,
    initTimer,
  }
}

export default useTimer
