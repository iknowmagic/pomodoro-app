import { useStorage } from '@vueuse/core'

import { acceptHMRUpdate, defineStore } from 'pinia'

import { SimpleObject } from '@/types'

export const useThemeStore = defineStore('useThemeStore', {
  state: (): SimpleObject => ({
    themeFont: useStorage('themeFont', 'sans', localStorage),
    themeColor: useStorage('themeColor', 'design-1', localStorage),
    colors: {
      'design-1': '#F87070',
      'design-2': '#70F3F8',
      'design-3': '#D881F8'
    }
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}
