import type { Task } from '@/types/task'
import { ApiError, httpClient } from './http-client'
import type { CreateTaskInput } from '@/types/create-task-input'

export class TaskService {
  static async createTask(task: CreateTaskInput): Promise<Task> {
    try {
      const { data } = await httpClient.post<Task>('/tasks', task)
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  }

  static async getAllTask(): Promise<Task[]> {
    try {
      const { data } = await httpClient.get<Task[]>('/tasks')
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  }

  static async getTaskById(id: Task['id']): Promise<Task> {
    try {
      const { data } = await httpClient.get<Task>(`/tasks/${id}`)
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  }

  static async updateTask(id: string, taskData: CreateTaskInput): Promise<Task> {
    try {
      const { data } = await httpClient.put<Task>(`/tasks/${id}`, taskData)

      return data
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  }

  static async deleteTask(id: Task['id']): Promise<void> {
    try {
      await httpClient.delete(`/tasks/${id}`)
    } catch (error) {
      console.error(error)
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  }
}
