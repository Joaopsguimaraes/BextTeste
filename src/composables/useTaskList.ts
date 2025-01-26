import { ref, computed } from 'vue'
import { format } from 'date-fns'
import { TaskService } from '@/helpers/task-service'
import type { Task } from '@/types/task'
import { categoryOptions } from '@/constants/category-options'
import { priorityOptions } from '@/constants/priority-options'

export function useTaskList() {
  const tasks = ref<Task[]>([])
  const filters = ref({
    categoryFilter: null as number | null,
    priorityFilter: null as number | null,
    searchTerm: '',
  })

  async function fetchTasks() {
    tasks.value = await TaskService.getAllTask()
  }

  const filteredTasks = computed(() => {
    return tasks.value.filter((task) => {
      const matchCategory =
        !filters.value.categoryFilter || task.category === filters.value.categoryFilter

      const matchPriority =
        !filters.value.priorityFilter || task.priority === filters.value.priorityFilter

      const matchSearch =
        !filters.value.searchTerm ||
        task.title.toLowerCase().includes(filters.value.searchTerm.toLowerCase())

      return matchCategory && matchPriority && matchSearch
    })
  })

  const tasksByCategory = computed(() => {
    return (categoryValue: number) => {
      return filteredTasks.value.filter((task) => task.category === categoryValue)
    }
  })

  const getCategoryLabel = (categoryValue: number) => {
    return categoryOptions.find((cat) => cat.value === categoryValue)?.label || ''
  }

  const getPriorityLabel = (priorityValue: number) => {
    return priorityOptions.find((priority) => priority.value === priorityValue)?.label || ''
  }

  const formatFinishDate = (date: string) => {
    return format(date, 'dd/MM/yyyy')
  }

  return {
    tasks,
    filters,
    fetchTasks,
    filteredTasks,
    tasksByCategory,
    getCategoryLabel,
    getPriorityLabel,
    formatFinishDate,
  }
}
