<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps({
  id: String,
  modelValue: [String, Number],
  required: Boolean,
  invalid: Boolean,
  ariaDescribedBy: String,
})

const emit = defineEmits(['update:modelValue'])
const field = inject('field', props)
</script>
<template>
  <input
    :id="field.id"
    :value="props.modelValue"
    @input="($event) => emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :required="field.required"
    :class="[
      'w-full p-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500',
      field.invalid ? 'border-red-500' : 'border-gray-300',
    ]"
  />
</template>
