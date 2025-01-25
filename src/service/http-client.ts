import type User from '@/@types/user'
import axios from 'axios'

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
})

export async function getUserByEmail(email: string): Promise<User | null> {
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
}
