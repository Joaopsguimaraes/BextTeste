import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { signinSchema } from '@/validations/signin-schema'
import type { SigninFields } from '@/types/signin-fields'

export function useSigninForm(onSubmit: (values: SigninFields) => Promise<void>) {
  const validationSchema = toTypedSchema(signinSchema)

  const form = useForm<SigninFields>({
    validationSchema,
  })

  const handleSubmit = form.handleSubmit(onSubmit)

  return {
    ...form,
    handleSubmit,
  }
}
