<script setup lang="ts">
import Input from '@/components/AppInput.vue'
import Field from '@/components/AppField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { ref } from 'vue'
import { createTaskSchema } from '@/validations/create-task-schema'
import Button from './AppButton.vue'
import { useRouter } from 'vue-router'
import { RoutesNames } from '@/constants/routes-names-enum'
import TextArea from './AppTextArea.vue'
import Select from './AppSelect.vue'
import { priorityOptions } from '@/constants/priority-options'
import { categoryOptions } from '@/constants/category-options'

const router = useRouter()
const loading = ref<boolean>(false)
const validationSchema = toTypedSchema(createTaskSchema)
const { handleSubmit, errors, resetForm } = useForm({ validationSchema })
const { value: title } = useField<string>('title')
const { value: description } = useField<string>('description')
const { value: priority } = useField<number>('priority')
const { value: category } = useField<number>('category')
const { value: finishAt } = useField<string>('finishAt')

const onSubmit = handleSubmit(async (values: unknown) => {
  console.log(values)
})

async function goBack(): Promise<void> {
  resetForm()

  router.push({
    name: RoutesNames.HOME,
  })
}
</script>

<template>
  <main class="flex flex-col justify-center m-10">
    <div class="w-full flex flex-col md:flex-row md:justify-between gap-2 items-center">
      <span class="text-2xl font-medium text-blue-900">Cadastre uma tarefa</span>
    </div>

    <div class="flex w-full items-start gap-10 mt-10 justify-center">
      <div class="flex flex-col w-full gap-5">
        <Field id="title" label="Titulo" required :error="errors.title">
          <Input placeholder="Digite o titulo da task..." v-model="title" />
        </Field>

        <Field id="description" label="Descrição" :error="errors.description">
          <TextArea placeholder="Digite uma descrição para task..." v-model="description" />
        </Field>

        <Field id="priority" label="Prioridade" :error="errors.priority">
          <Select :options="priorityOptions" v-model="priority" />
        </Field>
      </div>

      <div class="flex flex-col w-full gap-5">
        <Field id="category" label="Categoria" :error="errors.category">
          <Select :options="categoryOptions" v-model="category" />
        </Field>

        <Field id="finishAt" label="Data de conclusão" :error="errors.finishAt">
          <Input type="date" v-model="finishAt" />
        </Field>
      </div>
    </div>

    <div class="w-full flex justify-end gap-2 items-center">
      <Button @click="onSubmit" :loading="loading"> Cadastrar </Button>
      <Button @click="goBack" intent="secondary" :loading="loading"> Voltar </Button>
    </div>
  </main>
</template>
