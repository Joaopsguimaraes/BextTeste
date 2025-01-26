import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { authGuard } from './auth-guard'
import { RoutesNames } from '@/constants/routes-names-enum'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RoutesNames.HOME,
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/signin',
    name: RoutesNames.SIGNIN,
    component: () => import('@/views/SigninView.vue'),
  },
  {
    path: '/signup',
    name: RoutesNames.SIGNUP,
    component: () => import('@/views/SignupView.vue'),
  },
  {
    path: '/task/create',
    name: RoutesNames.TASK_CREATE,
    component: () => import('@/views/CreateTaskView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/task/edit/:id',
    name: RoutesNames.TASK_EDIT,
    component: () => import('@/views/EditTaskView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(authGuard)

export default router
