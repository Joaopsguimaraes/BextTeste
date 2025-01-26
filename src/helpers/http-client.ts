import axios, { AxiosError } from 'axios'

export class ApiError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
