import type { NavigationGuard } from 'vue-router'
import { useUserStore } from '@/stores/user'

export const authGuard: NavigationGuard = (to, from, next) => {
  const userStore = useUserStore()

  const publicRoutes = ['/signin', '/signup']

  if (publicRoutes.includes(to.path)) {
    next()
    return
  }

  if (!userStore.isAuthenticated) {
    next('/signin')
    return
  }

  next()
}
