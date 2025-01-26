<script setup lang="ts">
import type { SelectOptionsType } from '@/types/select-options-type'
import { inject, type PropType } from 'vue'

const props = defineProps({
  id: String,
  modelValue: [String, Number, null],
  required: Boolean,
  invalid: Boolean,
  options: {
    type: Array as PropType<SelectOptionsType[]>,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])
const field = inject('field', props)
</script>

<template>
  <select
    :id="field.id"
    :value="props.modelValue"
    @change="
      ($event) => emit('update:modelValue', Number(($event.target as HTMLSelectElement).value))
    "
    :required="field.required"
    :class="[
      'w-full p-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500',
      field.invalid ? 'border-red-500' : 'border-gray-300',
    ]"
  >
    <option value="" disabled>Selecione uma opção</option>
    <option v-for="option in props.options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
