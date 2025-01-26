import type { Task } from '@/types/task'
import { ApiError, httpClient } from './http-client'
import type { CreateTaskFields } from '@/types/create-task-fields'

export const TaskService = {
  async createTask(task: CreateTaskFields): Promise<Task> {
    try {
      const { data } = await httpClient.post<Task>('/tasks', task)
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  },

  async getAllTask(): Promise<Task[]> {
    try {
      const { data } = await httpClient.get<Task[]>('/tasks')
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  },
}
