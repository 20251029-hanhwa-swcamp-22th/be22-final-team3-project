<template>
  <RouterView />
  <ToastNotification />
</template>

<script setup>
import { RouterView } from 'vue-router'
import ToastNotification from '@/components/common/ToastNotification.vue'
</script>
