import { useStorage } from '@vueuse/core'

import { acceptHMRUpdate, defineStore } from 'pinia'

import { SimpleObject } from '@/types'

export const useThemeStore = defineStore('useThemeStore', {
  state: (): SimpleObject => ({
    themeFont: useStorage('themeFont', 'sans', localStorage),
    themeColor: useStorage('themeColor', 'design-1', localStorage)
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}
