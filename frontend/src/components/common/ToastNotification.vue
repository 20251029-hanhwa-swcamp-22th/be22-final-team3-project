<template>
  <div class="toast" :class="{ show: visible, error: isError }">
    {{ message }}
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast'

const { message, isError, visible } = useToast()
</script>

<style scoped>
.toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(-100px);
  background: var(--color-bg-dark);
  color: var(--color-text-white);
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  box-shadow: var(--shadow-toast);
  z-index: 1000;
  transition: transform 0.3s ease;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
}

.toast.error {
  background: var(--color-error);
}
</style>
