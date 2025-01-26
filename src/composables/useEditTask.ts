// src/composables/useEditTask.ts
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { TaskService } from '@/helpers/task-service'
import { RoutesNames } from '@/constants/routes-names-enum'
import type { CreateTaskFields } from '@/types/create-task-fields'
import type { Task } from '@/types/task'

export function useEditTask() {
  const router = useRouter()
  const toast = useToast()
  const loading = ref(false)
  const task = ref<Task | null>(null)

  async function fetchTask(taskId: string) {
    try {
      loading.value = true
      const data = await TaskService.getTaskById(taskId)
      task.value = data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar tarefa'

      toast.error(errorMessage)
      router.push({ name: RoutesNames.HOME })
    } finally {
      loading.value = false
    }
  }

  async function updateTask(taskData: CreateTaskFields) {
    if (!task.value) return

    try {
      loading.value = true
      await TaskService.updateTask(task.value.id, taskData)

      toast.success('Tarefa atualizada com sucesso!')
      await router.push({ name: RoutesNames.HOME })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar tarefa'

      toast.error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  function cancelEdit() {
    router.push({ name: RoutesNames.HOME })
  }

  return {
    task,
    loading,
    fetchTask,
    updateTask,
    cancelEdit,
  }
}
