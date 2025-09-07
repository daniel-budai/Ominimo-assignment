<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full" @click.stop>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">{{ title }}</h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="mb-6">
            <slot></slot>
          </div>
          
          <div class="flex justify-end space-x-3">
            <slot name="footer">
              <Button 
                variant="secondary" 
                @click="closeModal"
              >
                Cancel
              </Button>
              <Button 
                :variant="confirmVariant" 
                @click="confirm"
                :loading="loading"
              >
                {{ confirmText }}
              </Button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Button from './Button.vue';

type ModalVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';

interface Props {
  modelValue: boolean;
  title?: string;
  confirmText?: string;
  confirmVariant?: ModalVariant;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: 'Modal',
  confirmText: 'Confirm',
  confirmVariant: 'primary',
  loading: false
});

interface Emits {
  'update:modelValue': [value: boolean];
  'confirm': [];
}

const emit = defineEmits<Emits>();

const closeModal = () => {
  emit('update:modelValue', false);
};

const confirm = () => {
  emit('confirm');
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
