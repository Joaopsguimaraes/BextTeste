import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { TaskService } from '@/helpers/task-service'
import type { Task } from '@/types/task'

export function useRemoveTask() {
  const toast = useToast()
  const loading = ref(false)

  async function removeTask(taskId: Task['id'], onSuccess?: () => void) {
    try {
      loading.value = true
      await TaskService.deleteTask(taskId)

      toast.info('Tarefa removida com sucesso!')

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao remover tarefa'

      toast.error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  return {
    removeTask,
    loading,
  }
}
