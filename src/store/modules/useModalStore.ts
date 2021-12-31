import { acceptHMRUpdate, defineStore } from 'pinia'

import { SimpleObject } from '@/types'

export const useModalStore = defineStore('useModalStore', {
  state: (): SimpleObject => ({
    modalVisible: false
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot))
}
