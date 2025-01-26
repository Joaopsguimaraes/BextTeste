<script setup lang="ts">
import { PencilIcon } from 'lucide-vue-next'
import type { Task } from '@/types/task'
import AppButton from '@/components/AppButton.vue'
import AppBadge from '@/components/AppBadge.vue'
import type { BadgeVariant } from '@/components/AppBadge.vue'
import { categoryBadgeVariants } from '@/constants/category-badge-variants'
import { priorityBadgeVariants } from '@/constants/priority-badge-variants'

interface Props {
  task: Task
  onEdit: (id: Task['id']) => void
  getCategoryLabel: (category: number) => string
  getPriorityLabel: (priority: number) => string
  formatFinishDate: (date: string) => string
}

const props = defineProps<Props>()
const { formatFinishDate, getCategoryLabel, getPriorityLabel, onEdit, task } = props
</script>

<template>
  <div class="flex flex-col gap-2 bg-amber-100 rounded-xl p-4 mb-2">
    <div class="flex w-full justify-between items-center">
      <span class="text-lg font-medium">
        {{ task.title }}
      </span>
      <AppButton variant="text" @click="onEdit(task.id)">
        <PencilIcon />
      </AppButton>
    </div>

    <div class="flex gap-2">
      <AppBadge
        :variant="
          categoryBadgeVariants[task.category as keyof typeof categoryBadgeVariants] as BadgeVariant
        "
        size="md"
      >
        {{ getCategoryLabel(task.category) }}
      </AppBadge>

      <AppBadge
        :variant="
          priorityBadgeVariants[task.priority as keyof typeof priorityBadgeVariants] as BadgeVariant
        "
        size="md"
      >
        {{ getPriorityLabel(task.priority) }}
      </AppBadge>
    </div>
    <span v-if="task.finishAt"> Data de conclusão: {{ formatFinishDate(task.finishAt) }} </span>
  </div>
</template>
