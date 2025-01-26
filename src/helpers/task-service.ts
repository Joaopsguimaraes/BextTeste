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

  async getTaskById(id: Task['id']): Promise<Task> {
    try {
      const { data } = await httpClient.get<Task>(`/tasks/${id}`)
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  },

  async updateTask(id: string, taskData: CreateTaskFields): Promise<Task> {
    try {
      const { data } = await httpClient.put<Task>(`/tasks/${id}`, taskData)

      return data
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  },

  async deleteTask(id: Task['id']): Promise<void> {
    try {
      await httpClient.delete(`/tasks/${id}`)
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  },
}
