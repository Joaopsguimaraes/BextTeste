import type { SignupFields } from '@/@types/signup-fields'
import type User from '@/@types/user'
import axios from 'axios'

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
})

export const UserService = {
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data } = await httpClient.get<User>(`/users?email=${email}`)

      if (!data) {
        return null
      }

      return data
    } catch (error: unknown) {
      console.error(error)
      return null
    }
  },

  async createUser(user: SignupFields): Promise<void> {
    try {
      await httpClient.post<void>('/users', user)
    } catch (error) {
      console.error(error)
      // TODO: Refactor this error, change this value to axios instancie
      throw Error(error as string)
    }
  },
}
