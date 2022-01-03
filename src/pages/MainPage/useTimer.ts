import { computed, watch } from 'vue'

import { useIntervalFn } from '@vueuse/core'

import { useTimerStore } from '@/store'

import drawCircle from './favicons'

const useTimer = () => {
  const timerStore = useTimerStore()

  const updatePercentage = () => {
    const duration = timerStore.timerMap[timerStore.timerType].duration
    timerStore.percentage = Math.floor(
      // ((timerStore.timer || duration) / duration) * 100
      (timerStore.timer / duration) * 100
    )
  }

  updatePercentage()

  const { pause, resume, isActive } = useIntervalFn(
    () => {
      timerStore.timer--
      if (timerStore.timer <= 0) {
        timerStore.timer = 0
        if (timerStore.autoMode) {
          nextTimer()
        }
      }
      updatePercentage()
      renderFavicon()
      if (!timerStore.autoMode && timerStore.timer <= 0) {
        pause()
      }
    },
    1000,
    { immediate: false }
  )

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
        initTimer('shortBreak')
      } else {
        initTimer('longBreak')
      }
    } else {
      if (timerStore.pomodoros === 4) {
        timerStore.pomodoros = 1
      } else {
        timerStore.pomodoros++
      }
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

    // if minutes = 0 but seconds > 0, display minutes = 1
    return parseInt(seconds.toString()) !== 0 &&
      parseInt(minutes.toString()) === 0
      ? '01'
      : minutes
  })

  const initTimer = (type: string) => {
    timerStore.timerType = type
    updateTimer()
    updatePercentage()
    resume()
  }

  const updateTimer = () => {
    timerStore.timer = timerStore.timerMap[timerStore.timerType].duration
  }

  const start = () => {
    updateTimer()
    initTimer(timerStore.timerType)
  }

  const reset = () => {
    timerStore.pomodoros = 1
    timerStore.sessions = 0
    timerStore.timerType = 'pomodoro'
    updateTimer()
    updatePercentage()
  }

  return {
    timerToTime,
    pause,
    resume,
    start,
    reset,
    isActive,
    initTimer
  }
}

export default useTimer
