import { ref, watch } from 'vue'

import { useIntervalFn, useStorage } from '@vueuse/core'

const useTimer = () => {
  const timerType = ref('pomodoro')

  let initValue
  try {
    // @ts-expect-error localStorage
    initValue = JSON.parse(localStorage.getItem('timerMap'))
  } catch {
    initValue = {
      pomodoro: { duration: 60 * 25 },
      shortBreak: { duration: 60 * 5 },
      longBreak: { duration: 60 * 15 }
    }
  }

  // const pomodoroCount = useStorage(
  //   'pomodoroCount',
  //   localStorage.getItem('pomodoroCount') || 0,
  //   localStorage
  // )

  const timerMap = useStorage('timerMap', initValue, localStorage)
  const timer = ref(timerMap.value[timerType.value].duration)
  const currDuration = timerMap.value[timerType.value].duration
  const percentage = ref(
    Math.floor(((timer.value || currDuration) / currDuration) * 100)
  )

  const { pause, resume, isActive } = useIntervalFn(
    () => {
      if (--timer.value <= 0) {
        timer.value = 0
        pause()
      }
    },
    1000,
    { immediate: false }
  )

  const timerToTime = () => {
    let minutes
    let seconds
    minutes = parseInt((timer.value / 60).toString(), 10)
    seconds = parseInt((timer.value % 60).toString(), 10)
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    return minutes + ':' + seconds
  }

  const initTimer = (type: string) => {
    timerType.value = type
    resume()
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
    isActive,
    timerMap,
    initTimer,
    percentage
  }
}

export default useTimer
