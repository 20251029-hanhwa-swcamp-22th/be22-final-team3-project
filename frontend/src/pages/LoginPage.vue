<template>
  <div class="login-page">
    <HeroSection />
  </div>
</template>

<script setup>
import HeroSection from '@/components/landing/HeroSection.vue'
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: var(--color-primary);
}
</style>
