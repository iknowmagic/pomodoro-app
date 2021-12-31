import { useStorage } from '@vueuse/core'

import { acceptHMRUpdate, defineStore } from 'pinia'

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
    showSeconds: useStorage('showSeconds', false, localStorage),
    auto: useStorage('auto', true, localStorage),
    percentage: 0
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimerStore, import.meta.hot))
}
