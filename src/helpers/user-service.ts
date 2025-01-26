import type User from '@/types/user'
import { ApiError, httpClient } from './http-client'
import type { SignupInput } from '@/types/signup-input'

export class UserService {
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data } = await httpClient.get<User[]>(`/users?email=${email}`)
      return data.length > 0 ? data[0] : null
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  }

  static async createUser(user: SignupInput): Promise<User> {
    try {
      const { data } = await httpClient.post<User>('/users', user)
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  }
}
