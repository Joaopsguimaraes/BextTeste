<script setup lang="ts">
import TaskList from '@/components/TaskList.vue'
import HeaderApplication from '@/layouts/HeaderApplication.vue'
</script>

<template>
  <main class="flex flex-col justify-start bg-zinc-50 h-screen">
    <HeaderApplication />
    <TaskList />
  </main>
</template>
