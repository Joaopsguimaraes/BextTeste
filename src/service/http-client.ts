import type { SignupFields } from '@/@types/signup-fields'
import type User from '@/@types/user'
import axios, { AxiosError } from 'axios'

class ApiError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
})

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      throw new ApiError(
        'Um erro inesperado aconteceu, por favor tente novamente',
        error.response.status,
      )
    } else if (error.request) {
      throw new ApiError('Não há respostas vindo do servidor', 500)
    } else {
      throw new ApiError('Error na solicitação, por favor tente novamente', 500)
    }
  },
)

export const UserService = {
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data } = await httpClient.get<User[]>(`/users?email=${email}`)
      return data.length > 0 ? data[0] : null
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  },

  async createUser(user: SignupFields): Promise<User> {
    try {
      const { data } = await httpClient.post<User>('/users', user)
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`)
      }
      throw error
    }
  },
}
