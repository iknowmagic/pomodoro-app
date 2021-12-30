import { ref, watch } from 'vue'

import { useIntervalFn, useStorage } from '@vueuse/core'

import drawCircle from './favicons'

const useTimer = () => {
  const initValue = {
    pomodoro: { duration: 60 * 25 },
    shortBreak: { duration: 60 * 5 },
    longBreak: { duration: 60 * 15 }
  }

  const timerType = useStorage('pomodoro', 'pomodoro', localStorage)
  const pomodoros = useStorage('pomodoros', 1, localStorage)
  const sessions = useStorage('sessions', 0, localStorage)
  const timerMap = useStorage('timerMap', initValue, localStorage)
  const timer = useStorage(
    'timer',
    timerMap.value[timerType.value].duration,
    localStorage
  )

  const showSeconds = ref(false)
  const auto = ref(true)
  const currDuration = timerMap.value[timerType.value].duration
  const percentage = ref(
    Math.floor(((timer.value || currDuration) / currDuration) * 100)
  )

  const { pause, resume, isActive } = useIntervalFn(
    () => {
      if (--timer.value <= 0) {
        timer.value = 0
        nextTimer()
      }
      renderFavicon()
    },
    1000,
    { immediate: false }
  )

  const renderFavicon = () => {
    const favicon = document.getElementById('favicon')

    if (favicon) {
      favicon.href = drawCircle(percentage.value)
    }
  }

  const nextTimer = () => {
    if (timerType.value === 'pomodoro') {
      pomodoros.value++
      sessions.value++
      if (pomodoros.value < 4) {
        initTimer('shortBreak')
      } else {
        pomodoros.value = 1
        initTimer('longBreak')
      }
    } else {
      initTimer('pomodoro')
    }
  }

  const timerToTime = () => {
    let minutes
    let seconds
    minutes = parseInt((timer.value / 60).toString(), 10)
    seconds = parseInt((timer.value % 60).toString(), 10)
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    if (showSeconds.value) return minutes + ':' + seconds

    // if minutes = 0 but seconds > 0, display minutes = 1
    return parseInt(seconds.toString()) !== 0 &&
      parseInt(minutes.toString()) === 0
      ? '01'
      : minutes
  }

  const initTimer = (type: string) => {
    timerType.value = type
    if (auto.value) {
      resume()
    }
  }

  const start = () => {
    timer.value = timerMap.value[timerType.value].duration
    resume()
  }

  const reset = () => {
    pomodoros.value = 1
    sessions.value = 0
  }

  watch(timerType, () => {
    timer.value = timerMap.value[timerType.value].duration
  })
  watch(timer, () => {
    const duration = timerMap.value[timerType.value].duration
    percentage.value = Math.floor(((timer.value || duration) / duration) * 100)
  })

  return {
    timerType,
    timerToTime,
    pause,
    resume,
    start,
    isActive,
    timerMap,
    initTimer,
    percentage,
    pomodoros,
    sessions
  }
}

export default useTimer
