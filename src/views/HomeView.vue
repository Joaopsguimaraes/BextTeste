<script setup lang="ts">
import ActionsTask from '@/components/ActionsTask.vue'
import { categoryOptions } from '@/constants/category-options'
import { CategoryValuesEnum } from '@/constants/category-values-enum'
import { priorityOptions } from '@/constants/priority-options'
import { TaskService } from '@/helpers/task-service'
import HeaderApplication from '@/layouts/HeaderApplication.vue'
import type { Task } from '@/types/task'
import { computed, onMounted, ref } from 'vue'

const task = ref<Task[]>([])

onMounted(async () => {
  const tasks = await TaskService.getAllTask()

  task.value = tasks
})

const tasksStudy = computed(() => {
  return task.value.filter((item) => item.category === CategoryValuesEnum.STUDY)
})

const tasksPersonal = computed(() => {
  return task.value.filter((item) => item.category === CategoryValuesEnum.PERSONAL)
})

const tasksWork = computed(() => {
  return task.value.filter((item) => item.category === CategoryValuesEnum.WORK)
})
</script>

<template>
  <HeaderApplication />
  <main class="flex flex-col justify-center gap-10 p-10">
    <ActionsTask />
    <div class="flex gap-10">
      <div
        class="flex flex-col w-full gap-2"
        v-for="category in categoryOptions"
        :key="category.value"
      >
        <span class="text-2xl font-bold">{{ category.label }}</span>
        <div v-if="category.value === CategoryValuesEnum.STUDY">
          <div class="shadow-xl rounded-xl p-4 mb-2" v-for="item in tasksStudy" :key="item.id">
            <span>{{ item.title }}</span>
          </div>
        </div>
        <div v-if="category.value === CategoryValuesEnum.WORK">
          <div
            class="flex flex-col gap-2 shadow-xl rounded-xl p-4 mb-2"
            v-for="item in tasksWork"
            :key="item.id"
          >
            <span class="text-lg font-medium">{{ item.title }}</span>
            <span
              class="bg-blue-500 p-1 rounded-xl w-28 flex items-center justify-center text-white font-medium"
              >{{ categoryOptions.find(({ value }) => value === item.category)?.label }}</span
            >
            <span
              class="bg-yellow-500 p-1 rounded-xl w-28 flex items-center justify-center text-white font-medium"
              >{{ priorityOptions.find(({ value }) => value === item.priority)?.label }}</span
            >
          </div>
        </div>
        <div v-if="category.value === CategoryValuesEnum.PERSONAL">
          <div class="shadow-xl rounded-xl p-4 mb-2" v-for="item in tasksPersonal" :key="item.id">
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
