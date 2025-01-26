import type { z } from 'zod'
import type { signupSchema } from '@/validations/signup-schema'

export type SignupFields = z.infer<typeof signupSchema>
