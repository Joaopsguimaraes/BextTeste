<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { cva } from 'class-variance-authority'

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default'

const props = defineProps({
  variant: {
    type: String as PropType<BadgeVariant>,
    default: 'default',
    validator: (val: string) => ['success', 'warning', 'danger', 'info', 'default'].includes(val),
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
    validator: (val: string) => ['sm', 'md', 'lg'].includes(val),
  },
})

const badgeClasses = computed(() => {
  return cva('inline-flex items-center justify-center rounded-xl font-medium', {
    variants: {
      variant: {
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-white',
        danger: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        default: 'bg-gray-500 text-white',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
  })({
    variant: props.variant,
    size: props.size,
  })
})
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>
