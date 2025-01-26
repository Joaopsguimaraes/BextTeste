import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  username: z.string().min(3, { message: 'Nome do usuário deve ter pelo menos 3 caracteres' }),
  email: z.string().min(1, 'Email é obrigatório').email('Precisa ser um email valido'),
  password: z.string().min(8, 'Senha muito curta, deve conter no mínimo 8 caracteres'),
})
