<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="flex w-xl bg-gray-50 flex-col gap-5 justify-center items-center shadow-lg p-5 rounded-lg"
  >
    <img src="/logo.png" alt="Logo Bext" />
    <h2 class="text-center m-2 text-xl font-bold my-2">Gerenciador de tarefas</h2>
    <span class="text-center m-2 text-lg font-medium">{{ props.title }}</span>
    <slot />
  </div>
</template>
