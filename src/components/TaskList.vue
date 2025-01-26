<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { RoutesNames } from '@/constants/routes-names-enum'
import TaskListHeader from '@/components/TaskListHeader.vue'
import TaskFilters from '@/components/TaskFilters.vue'
import BaseCardTask from '@/components/BaseCardTask.vue'
import { categoryOptions } from '@/constants/category-options'
import { useTaskList } from '@/composables/useTaskList'
import { useRemoveTask } from '@/composables/useRemoveTask'
import type { Task } from '@/types/task'

const router = useRouter()

const {
  filters,
  fetchTasks,
  tasksByCategory,
  getCategoryLabel,
  getPriorityLabel,
  formatFinishDate,
} = useTaskList()
const { removeTask } = useRemoveTask()

async function goEditTask(id: string) {
  await router.push({
    name: RoutesNames.TASK_EDIT,
    params: { id },
  })
}

function handleRemoveTask(id: Task['id']) {
  removeTask(id, async () => {
    await fetchTasks()
  })
}

onMounted(async () => {
  await fetchTasks()
})
</script>

<template>
  <TaskListHeader />
  <TaskFilters v-model="filters" />

  <div class="flex gap-10 h-full flex-wrap md:flex-nowrap m-5 p-5 bg-white rounded-lg shadow">
    <div
      v-for="category in categoryOptions"
      :key="category.value"
      class="flex flex-col w-full p-5 rounded-lg bg-zinc-50 gap-2 bg"
    >
      <span class="text-2xl font-bold text-center mb-2 text-blue-900">
        {{ category.label }}
      </span>

      <div v-if="tasksByCategory(category.value as number).length" class="space-y-4">
        <BaseCardTask
          v-for="task in tasksByCategory(category.value as number)"
          :key="task.id"
          :task="task"
          :on-edit="goEditTask"
          :on-remove="handleRemoveTask"
          :get-category-label="getCategoryLabel"
          :get-priority-label="getPriorityLabel"
          :format-finish-date="formatFinishDate"
        />
      </div>
      <div v-else class="text-gray-500 italic">Nenhuma tarefa nesta categoria</div>
    </div>
  </div>
</template>
