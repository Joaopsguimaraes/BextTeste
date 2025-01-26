import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { signupSchema } from '@/validations/signup-schema'
import type { SignupFields } from '@/types/signup-fields'

export function useSignupForm(onSubmit: (values: SignupFields) => Promise<void>) {
  const validationSchema = toTypedSchema(signupSchema)

  const form = useForm<SignupFields>({
    validationSchema,
  })

  const handleSubmit = form.handleSubmit(onSubmit)

  return {
    ...form,
    handleSubmit,
  }
}
