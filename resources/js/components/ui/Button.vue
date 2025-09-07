<template>
  <button
    :type="type"
    :class="[
      'px-4 py-2 rounded transition-colors',
      variantClasses,
      sizeClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="inline-block mr-2">
      <svg class="animate-spin h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false
});

const variantClasses = computed(() => {
  const classes: Record<ButtonVariant, string> = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-700',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  };
  return classes[props.variant];
});

const sizeClasses = computed(() => {
  const classes: Record<ButtonSize, string> = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  return classes[props.size];
});
</script>
