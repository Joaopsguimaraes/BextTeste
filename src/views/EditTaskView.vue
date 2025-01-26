<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderApplication from '@/layouts/HeaderApplication.vue'
import TaskForm from '@/components/TaskForm.vue'

const route = useRoute()

const taskId = computed(() => route.params.id as string)
</script>

<template>
  <HeaderApplication />
  <main class="flex flex-col justify-center p-10">
    <TaskForm mode="edit" :initial-data="{ id: taskId }" />
  </main>
</template>
