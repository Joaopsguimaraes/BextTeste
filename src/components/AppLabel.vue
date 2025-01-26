<script setup lang="ts">
const props = defineProps({
  for: String,
  required: Boolean,
})
</script>
<template>
  <label :for="props.for" class="mb-1 inline-block text-sm font-medium text-gray-700">
    <slot></slot>
    <span v-if="props.required" class="text-red-600">*</span>
  </label>
</template>
