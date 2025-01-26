import { z } from 'zod'

export const signinSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Precisa ser um email valido'),
  password: z.string().min(8, 'Senha muito curta, deve conter no mínimo 8 caracteres'),
})
