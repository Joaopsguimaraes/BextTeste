<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, provide } from 'vue'
import { v4 as uuid } from 'uuid'
import Label from './Label.vue'
import ErrorMessage from './ErrorMessage.vue'

const props = defineProps({
  id: {
    type: String,
    default: () => `field-${uuid()}`,
  },
  label: String,
  required: Boolean,
  error: String,
})

provide(
  'field',
  computed(() => {
    return {
      ...props,
      invalid: !!props.error,
    }
  }),
)
</script>
<template>
  <div class="flex flex-col items-start w-full">
    <Label :for="props.id" :required="props.required" v-if="props.label"> {{ props.label }} </Label>
    <slot v-bind="props" />
    <ErrorMessage v-if="props.error">
      {{ props.error }}
    </ErrorMessage>
  </div>
</template>
