import { useStorage } from '@vueuse/core'

import { acceptHMRUpdate, defineStore } from 'pinia'

import { use } from 'chai'

import { SimpleObject } from '@/types'

export const useTimerStore = defineStore('useTimerStore', {
  state: (): SimpleObject => ({
    timerType: useStorage('pomodoro', 'pomodoro', localStorage),
    pomodoros: useStorage('pomodoros', 1, localStorage),
    sessions: useStorage('sessions', 0, localStorage),
    timerMap: useStorage(
      'timerMap',
      {
        pomodoro: { duration: 60 * 25 },
        shortBreak: { duration: 60 * 5 },
        longBreak: { duration: 60 * 15 }
      },
      localStorage
    ),
    timer: useStorage('timer', 60 * 25, localStorage),
    auto: useStorage('auto', true, localStorage),
    percentage: 0,

    showSeconds: useStorage('showSeconds', false, localStorage),
    showCompletedPomodoros: useStorage(
      'showCompletedPomodoros',
      true,
      localStorage
    )
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimerStore, import.meta.hot))
}
