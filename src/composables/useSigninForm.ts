import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { signinSchema } from '@/validations/signin-schema'
import type { SigninInput } from '@/types/signin-input'

export function useSigninForm(onSubmit: (values: SigninInput) => Promise<void>) {
  const validationSchema = toTypedSchema(signinSchema)

  const form = useForm<SigninInput>({
    validationSchema,
  })

  const handleSubmit = form.handleSubmit(onSubmit)

  return {
    ...form,
    handleSubmit,
  }
}
