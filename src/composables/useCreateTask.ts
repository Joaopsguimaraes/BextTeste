import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { TaskService } from '@/helpers/task-service'
import { RoutesNames } from '@/constants/routes-names-enum'
import type { CreateTaskInput } from '@/types/create-task-input'

export function useCreateTask() {
  const router = useRouter()
  const toast = useToast()
  const loading = ref(false)

  async function createTask(taskData: CreateTaskInput) {
    try {
      loading.value = true
      await TaskService.createTask(taskData)

      toast.success('Tarefa cadastrada com sucesso!')
      await router.push({ name: RoutesNames.HOME })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao realizar cadastro'

      toast.error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  function cancelTask() {
    router.push({ name: RoutesNames.HOME })
  }

  return {
    createTask,
    cancelTask,
    loading,
  }
}
