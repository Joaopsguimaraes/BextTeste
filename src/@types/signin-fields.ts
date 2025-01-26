import type { signinSchema } from '@/validations/signin-schema'
import type { z } from 'zod'

export type SigninFields = z.infer<typeof signinSchema>
