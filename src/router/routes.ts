import MainLayout from '@/layouts/MainLayout.vue'
import MainPage from '@/pages/MainPage'
import NotFound from '@/pages/NotFound.vue'

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'MainPage',
        component: MainPage,
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
