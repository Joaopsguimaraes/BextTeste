<script setup lang="ts">
import CreateTaskForm from '@/components/CreateTaskForm.vue'
import HeaderApplication from '@/layouts/HeaderApplication.vue'
</script>

<template>
  <HeaderApplication />
  <main class="flex flex-col justify-center p-10">
    <CreateTaskForm />
  </main>
</template>
