<script setup lang="ts">
import { computed, onMounted } from 'vue'
import Input from '@/components/AppInput.vue'
import Field from '@/components/AppField.vue'
import TextArea from '@/components/AppTextArea.vue'
import Select from '@/components/AppSelect.vue'

import { priorityOptions } from '@/constants/priority-options'
import { categoryOptions } from '@/constants/category-options'

import { useCreateTask } from '@/composables/useCreateTask'
import { useEditTask } from '@/composables/useEditTask'
import { useTaskForm } from '@/composables/useTaskForm'
import type { Task } from '@/types/task'
import AppButton from '@/components/AppButton.vue'

interface Props {
  mode?: 'create' | 'edit'
  initialData?: Partial<Task>
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create',
  initialData: () => ({}),
})

const isEditMode = computed(() => props.mode === 'edit')
const { createTask, loading: createLoading, cancelTask } = useCreateTask()
const { updateTask, loading: editLoading, fetchTask, task } = useEditTask()

const loading = computed(() => (isEditMode.value ? editLoading.value : createLoading.value))

const submitHandler = isEditMode.value ? updateTask : createTask

const { handleSubmit, errors, defineField, resetForm } = useTaskForm(submitHandler)

const [title, titleProps] = defineField('title')
const [description, descriptionProps] = defineField('description')
const [priority, priorityProps] = defineField('priority')
const [category, categoryProps] = defineField('category')
const [finishAt, finishAtProps] = defineField('finishAt')

const isFormFilled = computed(() => {
  return title.value && priority.value && category.value
})

onMounted(async () => {
  if (isEditMode.value && props.initialData?.id) {
    await fetchTask(props.initialData.id.toString())
  }

  if (task.value) {
    resetForm({
      values: {
        title: task.value.title || '',
        description: task.value.description || '',
        priority: task.value.priority,
        category: task.value.category,
        finishAt: task.value.finishAt || '',
      },
    })
  }
})
</script>

<template>
  <main class="flex flex-col justify-center space-y-6">
    <header class="w-full flex justify-between items-center">
      <h1 class="text-2xl font-medium text-blue-900">Cadastre uma tarefa</h1>
    </header>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <Field id="title" label="Título" required :error="errors.title">
          <Input v-model="title" v-bind="titleProps" placeholder="Digite o título da tarefa" />
        </Field>

        <Field id="description" label="Descrição" :error="errors.description">
          <TextArea
            v-model="description"
            v-bind="descriptionProps"
            placeholder="Digite uma descrição para a tarefa"
          />
        </Field>

        <Field id="priority" label="Prioridade" required :error="errors.priority">
          <Select v-model="priority" v-bind="priorityProps" :options="priorityOptions" />
        </Field>
      </div>

      <div class="space-y-4">
        <Field id="category" label="Categoria" required :error="errors.category">
          <Select v-model="category" v-bind="categoryProps" :options="categoryOptions" />
        </Field>

        <Field id="finishAt" label="Data de conclusão" :error="errors.finishAt">
          <Input type="date" v-model="finishAt" v-bind="finishAtProps" />
        </Field>
      </div>
    </div>

    <footer class="flex justify-end space-x-4">
      <AppButton @click="cancelTask" variant="secondary" :disabled="loading"> Cancelar </AppButton>
      <AppButton @click="handleSubmit" :loading="loading" :disabled="!isFormFilled">
        <span v-if="props.mode === 'create'">Cadastrar</span>
        <span v-else>Atualizar</span>
      </AppButton>
    </footer>
  </main>
</template>
