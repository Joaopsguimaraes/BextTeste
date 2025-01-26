<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps({
  id: String,
  modelValue: [String, Number],
  required: Boolean,
  invalid: Boolean,
  ariaDescribedBy: String,
  rows: {
    type: Number,
    default: 4,
  },
})

const emit = defineEmits(['update:modelValue'])
const field = inject('field', props)
</script>

<template>
  <textarea
    :id="field.id"
    :value="props.modelValue"
    @input="($event) => emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    :required="field.required"
    :rows="props.rows"
    :class="[
      'w-full p-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-vertical',
      field.invalid ? 'border-red-500' : 'border-gray-300',
    ]"
  />
</template>
