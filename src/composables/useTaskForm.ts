import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { createTaskSchema } from '@/validations/create-task-schema'
import type { CreateTaskFields } from '@/types/create-task-fields'

export function useTaskForm(onSubmit: (values: CreateTaskFields) => Promise<void>) {
  const validationSchema = toTypedSchema(createTaskSchema)

  const form = useForm<CreateTaskFields>({
    validationSchema,
  })

  const handleSubmit = form.handleSubmit(onSubmit)

  return {
    ...form,
    handleSubmit,
  }
}
