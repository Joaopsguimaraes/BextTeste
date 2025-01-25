import { ref } from 'vue'
import { defineStore } from 'pinia'
import type User from '@/@types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({} as User)

  function addUser(newUser: User) {
    user.value = newUser
  }

  return { user, addUser }
})
