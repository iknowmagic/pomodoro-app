import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_BASE as string),
  routes
})

router.beforeEach((to, from, next) => {
  // @ts-expect-error document.title
  document.title = to.meta.title
    ? `${to.meta.title} | ${import.meta.env.VITE_APP_TITLE}`
    : import.meta.env.VITE_APP_TITLE
  next()
})

export default router
