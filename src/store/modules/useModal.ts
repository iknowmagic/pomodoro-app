import { acceptHMRUpdate, defineStore } from 'pinia'

import { SimpleObject } from '@/types'

export const useModal = defineStore('useModal', {
  state: (): SimpleObject => ({
    modalVisible: false
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModal, import.meta.hot))
}
