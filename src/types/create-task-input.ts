import type { createTaskSchema } from '@/validations/create-task-schema'
import type { z } from 'zod'

export type CreateTaskInput = z.infer<typeof createTaskSchema>
