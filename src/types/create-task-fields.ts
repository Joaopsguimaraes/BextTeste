import type { createTaskSchema } from '@/validations/create-task-schema'
import type { z } from 'zod'

export type CreateTaskFields = z.infer<typeof createTaskSchema>
