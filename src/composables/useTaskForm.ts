import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { createTaskSchema } from '@/validations/create-task-schema'
import type { CreateTaskInput } from '@/types/create-task-input'

export function useTaskForm(onSubmit: (values: CreateTaskInput) => Promise<void>) {
  const validationSchema = toTypedSchema(createTaskSchema)

  const form = useForm<CreateTaskInput>({
    validationSchema,
  })

  const handleSubmit = form.handleSubmit(onSubmit)

  return {
    ...form,
    handleSubmit,
  }
}
