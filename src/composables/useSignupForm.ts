import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { signupSchema } from '@/validations/signup-schema'
import type { SignupInput } from '@/types/signup-input'

export function useSignupForm(onSubmit: (values: SignupInput) => Promise<void>) {
  const validationSchema = toTypedSchema(signupSchema)

  const form = useForm<SignupInput>({
    validationSchema,
  })

  const handleSubmit = form.handleSubmit(onSubmit)

  return {
    ...form,
    handleSubmit,
  }
}
