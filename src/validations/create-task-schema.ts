import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string({
      message: 'Titulo é obrigatório',
    })
    .min(1, {
      message: 'Titulo é obrigatório',
    }),
  description: z.string().optional(),
  priority: z
    .number({
      invalid_type_error: 'Selecione uma prioridade válida',
    })
    .min(1, { message: 'Prioridade inválida' })
    .max(3, { message: 'Prioridade inválida' }),
  finishAt: z.string().optional(),
  category: z
    .number({
      invalid_type_error: 'Selecione uma categoria válida',
    })
    .min(1, { message: 'Categoria inválida' })
    .max(3, { message: 'Categoria inválida' }),
})
