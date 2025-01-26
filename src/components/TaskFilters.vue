<script setup lang="ts">
import Select from '@/components/AppSelect.vue'
import Input from '@/components/AppInput.vue'
import { categoryOptions } from '@/constants/category-options'
import { priorityOptions } from '@/constants/priority-options'
import { computed } from 'vue'
import type { TaskFilters } from '@/types/task-filters'
import AppButton from './AppButton.vue'

interface TaskFiltersProps {
  modelValue: TaskFilters
}

const props = defineProps<TaskFiltersProps>()
const emit = defineEmits(['update:modelValue'])

const categoryFilter = computed({
  get: () => props.modelValue.categoryFilter,
  set: (value) => {
    emit('update:modelValue', {
      ...props.modelValue,
      categoryFilter: value,
    })
  },
})

const priorityFilter = computed({
  get: () => props.modelValue.priorityFilter,
  set: (value) => {
    emit('update:modelValue', {
      ...props.modelValue,
      priorityFilter: value,
    })
  },
})

const searchTerm = computed({
  get: () => props.modelValue.searchTerm,
  set: (value) => {
    emit('update:modelValue', {
      ...props.modelValue,
      searchTerm: value,
    })
  },
})

function resetFilters() {
  emit('update:modelValue', {
    categoryFilter: null,
    priorityFilter: null,
    searchTerm: '',
  })
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 m-5 p-10 bg-white rounded-lg shadow">
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 mb-1"> Pesquisar Tarefa </label>
      <Input v-model="searchTerm" placeholder="Busque por título da tarefa" />
    </div>
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 mb-1"> Filtrar por Categoria </label>
      <Select :options="categoryOptions" v-model="categoryFilter" />
    </div>
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 mb-1"> Filtrar por Prioridade </label>
      <Select :options="priorityOptions" v-model="priorityFilter" />
    </div>
    <div class="flex self-end">
      <AppButton variant="secondary" @click="resetFilters"> Limpar Filtros </AppButton>
    </div>
  </div>
</template>
