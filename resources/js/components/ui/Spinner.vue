<template>
  <div class="flex justify-center items-center">
    <div 
      class="animate-spin rounded-full border-t-2 border-b-2" 
      :class="[
        sizeClasses,
        `border-${color}-500`
      ]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerColor = 'blue' | 'gray' | 'red' | 'green' | 'yellow';

interface Props {
  size?: SpinnerSize;
  color?: SpinnerColor;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'blue'
});

const sizeClasses = computed(() => {
  const classes: Record<SpinnerSize, string> = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };
  return classes[props.size];
});
</script>
