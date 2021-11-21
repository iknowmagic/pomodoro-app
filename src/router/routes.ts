import MainLayout from '@/layouts/MainLayout.vue'
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/NotFound.vue'

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Welcome'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: NotFound,
    name: 'NotFound',
    meta: {
      title: 'Page Not Found'
    }
  }
]
