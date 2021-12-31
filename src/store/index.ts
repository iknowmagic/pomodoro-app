import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
export { test } from './modules/test'
export { useModalStore } from './modules/useModalStore'
export { useTimerStore } from './modules/useTimerStore'
export { useThemeStore } from './modules/useThemeStore'
