<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'
import HeaderApplication from '@/layouts/HeaderApplication.vue'
</script>

<template>
  <HeaderApplication />
  <main class="flex flex-col justify-center p-10">
    <TaskForm />
  </main>
</template>
