<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="[
          'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        ]"
      />
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  label?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  type: 'text',
  id: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  placeholder: '',
  required: false,
  disabled: false,
  error: '',
  hint: ''
});

interface Emits {
  'update:modelValue': [value: string];
}

defineEmits<Emits>();
</script>
