<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { cva } from 'class-variance-authority'

export type ButtonVariants = 'primary' | 'secondary' | 'text'

const props = defineProps({
  leftIcon: Object,
  rightIcon: Object,
  loading: Boolean,
  disabled: Boolean,
  as: {
    type: [String, Object],
    default: 'button',
  },
  variant: {
    type: String as PropType<ButtonVariants>,
    validator: (val: string) => ['primary', 'secondary', 'text'].includes(val),
    default: 'primary',
  },
})

const buttonClass = computed(() => {
  return cva(
    'min-w-32 p-2 inline-flex gap-4 items-center justify-center rounded-lg cursor-pointer',
    {
      variants: {
        variant: {
          primary: 'bg-gray-900 hover:bg-gray-800 text-white',
          secondary: 'bg-none hover:bg-gray-100 text-gray-900 border border-gray-900',
          text: 'text-gray-900 hover:bg-gray-100',
        },
        disabled: {
          true: '!bg-gray-100 !text-gray-400 !cursor-not-allowed',
        },
      },
    },
  )({
    variant: props.variant,
    disabled: props.disabled,
  })
})
</script>
<template>
  <component :is="props.as" :disabled="props.disabled" :class="buttonClass">
    <svg
      v-if="props.loading"
      class="size-5 animate-spin absolute"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <component
      :is="props.leftIcon"
      :class="['size-4 mr-2 fill-white', props.loading && 'invisible']"
    />
    <slot />
    <component
      :is="props.rightIcon"
      :class="['size-4 ml-2 fill-white', props.loading && 'invisible']"
    />
  </component>
</template>
