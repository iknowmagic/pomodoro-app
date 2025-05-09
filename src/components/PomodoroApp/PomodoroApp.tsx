import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaCog } from 'react-icons/fa'
import { useTimerStore } from '../../store/timerStore'
import { useThemeStore } from '../../store/themeStore'
import { useModalStore } from '../../store/modalStore'
import { updateFavicon } from '../../utils/faviconUtils'
import TimerPills from '../TimerPills/TimerPills'
import TimerClock from '../TimerClock/TimerClock'
import SettingsModal from '../SettingsModal/SettingsModal'

export const PomodoroApp: React.FC = () => {
  const timerStore = useTimerStore()
  const themeStore = useThemeStore()
  const modalStore = useModalStore()

  // Use ref for interval to avoid re-renders
  const intervalRef = useRef<number | null>(null)

  // Format time for display
  const formatTime = () => {
    const minutes = Math.floor(timerStore.timer / 60)
    const seconds = timerStore.timer % 60

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    if (!timerStore.showSeconds) {
      return formattedMinutes
    }

    return `${formattedMinutes}:${formattedSeconds}`
  }

  // Setup timer interval
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Only start interval if timer is active
    if (timerStore.isActive) {
      intervalRef.current = window.setInterval(() => {
        timerStore.tick()
      }, 1000)
    }

    // Cleanup interval on unmount or when isActive changes
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [timerStore.isActive, timerStore.tick])

  // Update favicon when percentage changes
  useEffect(() => {
    updateFavicon(
      timerStore.percentage,
      themeStore.colors[themeStore.themeColor],
    )
  }, [timerStore.percentage, themeStore.themeColor, themeStore.colors])

  // Set theme color CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--theme-color',
      `var(--${themeStore.themeColor})`,
    )
  }, [themeStore.themeColor])

  return (
    <div
      className={`flex flex-col min-h-screen items-center px-4 ${
        themeStore.themeFont === 'sans'
          ? 'font-sans'
          : themeStore.themeFont === 'serif'
            ? 'font-serif'
            : 'font-mono'
      }`}
      data-testid="pomodoro-app"
    >
      <header className="pt-10 pb-6">
        <h1 className="font-bold text-gray-200 text-3xl">pomodoro</h1>
      </header>

      <main className="flex flex-col flex-grow items-center w-full max-w-md">
        <TimerPills onSelectTimer={timerStore.changeTimerType} />

        <div className="my-12">
          <TimerClock
            timerDisplay={formatTime()}
            isActive={timerStore.isActive}
            shouldResume={timerStore.shouldResume}
            onStart={timerStore.startTimer}
            onStop={timerStore.stopTimer}
          />
        </div>

        {timerStore.showCompletedPomodoros && timerStore.sessions > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {Array.from({ length: timerStore.sessions }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-theme-color rounded-full w-2 h-2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="py-8">
        <motion.button
          className="opacity-40 hover:opacity-90 p-3 rounded-full transition-opacity"
          onClick={() => modalStore.openModal()}
          whileHover={{ rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Settings"
        >
          <FaCog className="w-6 h-6" />
        </motion.button>
      </footer>

      <SettingsModal onApply={timerStore.resetTimer} />
    </div>
  )
}

export default PomodoroApp
