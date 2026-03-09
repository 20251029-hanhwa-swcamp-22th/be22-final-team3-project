import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { layout: 'none' },
  },
  // Future routes:
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('@/pages/DashboardPage.vue'),
  //   meta: { requiresAuth: true },
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

// Navigation guard — activate when auth routes are added
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })

export default router
