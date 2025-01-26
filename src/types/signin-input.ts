import type { signinSchema } from '@/validations/signin-schema'
import type { z } from 'zod'

export type SigninInput = z.infer<typeof signinSchema>
