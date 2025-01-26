import { z } from 'zod'

export const signupSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
    })
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  username: z
    .string({
      required_error: 'Username é obrigatório',
    })
    .min(3, { message: 'Nome do usuário deve ter pelo menos 3 caracteres' }),
  email: z
    .string({
      required_error: 'Email é obrigatório',
    })
    .min(1, 'Email é obrigatório')
    .email('Precisa ser um email valido'),
  password: z
    .string({
      required_error: 'Password é obrigatório',
    })
    .min(8, 'Senha muito curta, deve conter no mínimo 8 caracteres'),
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString()),
})
