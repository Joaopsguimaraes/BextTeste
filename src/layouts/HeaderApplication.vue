<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { LogOutIcon, UserIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()

async function signout() {
  user.clearUser()
  await router.push('/signin')
}
</script>
<template>
  <nav class="bg-gray-200">
    <div class="flex h-16 items-center justify-between">
      <img class="h-8 w-auto ml-5" src="/logo.png" alt="Bext logo" />
      <div class="flex items-center pr-2">
        <div
          type="button"
          class="relative flex rounded-full bg-gray-50 p-2 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
        >
          <UserIcon class="size-6 text-blue-900" />
        </div>

        <div class="md:flex flex-col ml-3 hidden">
          <span class="text-blue-950 font-bold">{{ user.user?.username }}</span>
          <span class="text-sm">{{ user.user?.email }}</span>
        </div>
        <button class="ml-2 p-2 rounded-sm hover:bg-zinc-50 cursor-pointer" @click="signout">
          <LogOutIcon />
        </button>
      </div>
    </div>
  </nav>
</template>
