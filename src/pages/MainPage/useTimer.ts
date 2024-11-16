import { useTimerStore } from '@/store'
import { useIntervalFn } from '@vueuse/core'
import { computed, ref } from 'vue'
import drawCircle from './favicons'

const useTimer = () => {
  const timerStore = useTimerStore()

  const isActive = ref(false)

  const updatePercentage = () => {
    const duration = timerStore.timerMap[timerStore.timerType].duration
    timerStore.percentage = Math.floor((timerStore.timer / duration) * 100)
  }

  updatePercentage()

  const { pause: pauseInterval, resume: resumeInterval } = useIntervalFn(
    () => {
      timerStore.timer--
      if (timerStore.timer <= 0) {
        timerStore.timer = 0
        stop()
        if (timerStore.autoMode) {
          nextTimer()
        }
      }
      updatePercentage()
      renderFavicon()
    },
    1000,
    { immediate: false }
  )

  // Ensure the interval is paused upon initialization
  pauseInterval()

  const renderFavicon = () => {
    const favicon = document.getElementById('favicon')
    if (favicon) {
      // @ts-expect-error favicon
      favicon.href = drawCircle(timerStore.percentage, {
        backgroundLine: true,
        strokeWidth: 10
      })
    }
  }

  const nextTimer = () => {
    if (timerStore.timerType === 'pomodoro') {
      timerStore.sessions++
      if (timerStore.pomodoros < 4) {
        timerStore.pomodoros++
        initTimer('shortBreak')
      } else {
        timerStore.pomodoros = 1
        initTimer('longBreak')
      }
    } else {
      initTimer('pomodoro')
    }
  }

  const timerToTime = computed(() => {
    let minutes
    let seconds
    minutes = parseInt((timerStore.timer / 60).toString(), 10)
    seconds = parseInt((timerStore.timer % 60).toString(), 10)
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    if (timerStore.showSeconds) return minutes + ':' + seconds

    return parseInt(seconds.toString()) !== 0 &&
      parseInt(minutes.toString()) === 0
      ? '01'
      : minutes
  })

  const initTimer = (type: string) => {
    timerStore.timerType = type
    updateTimer()
    updatePercentage()
    if (timerStore.autoMode) {
      start()
    } else {
      stop()
    }
  }

  const updateTimer = () => {
    timerStore.timer = timerStore.timerMap[timerStore.timerType].duration
  }

  const start = () => {
    isActive.value = true
    resumeInterval()
    localStorage.setItem('timerActive', 'true')
  }

  const stop = () => {
    pauseInterval()
    isActive.value = false
    localStorage.setItem('timerActive', 'false')
  }

  const reset = () => {
    timerStore.timer = timerStore.timerMap[timerStore.timerType].duration
    updatePercentage()
    pauseInterval()
    isActive.value = false
    localStorage.setItem('timerActive', 'false')
  }

  // Save timer state before unload
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('timer', timerStore.timer.toString())
    localStorage.setItem('timerType', timerStore.timerType)
    // Do not update 'timerActive' here
  })

  // Restore timer state on load
  const savedTimer = localStorage.getItem('timer')
  const savedTimerType = localStorage.getItem('timerType')
  const savedTimerActive = localStorage.getItem('timerActive')

  if (savedTimer && savedTimerType) {
    timerStore.timer = parseInt(savedTimer, 10)
    timerStore.timerType = savedTimerType
    updatePercentage()
  }

  // Determine if we should display 'Resume' or 'Play'
  if (savedTimerActive === 'true' && timerStore.timer > 0) {
    isActive.value = false // Timer is not running until user clicks "Resume"
    // Do not update 'timerActive' in localStorage here
  } else if (timerStore.timer <= 0) {
    // If the timer has completed, ensure 'timerActive' is false
    localStorage.setItem('timerActive', 'false')
  }

  return {
    timerToTime,
    start,
    stop,
    reset,
    isActive,
    initTimer
  }
}

export default useTimer
