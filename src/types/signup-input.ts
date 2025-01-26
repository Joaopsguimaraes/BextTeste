import type { z } from 'zod'
import type { signupSchema } from '@/validations/signup-schema'

export type SignupInput = z.infer<typeof signupSchema>
