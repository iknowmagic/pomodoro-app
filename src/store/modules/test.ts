import { acceptHMRUpdate, defineStore } from 'pinia'

import { SimpleObject } from '@/types'

export const test = defineStore('test', {
  state: (): SimpleObject => ({
    hello: 'Hello from the state manager'
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(test, import.meta.hot))
}
