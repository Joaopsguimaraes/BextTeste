import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type User from '@/@types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  function addUser(newUser: User) {
    user.value = newUser
  }

  function clearUser() {
    user.value = null
  }

  return { user, addUser, clearUser, isAuthenticated }
})
