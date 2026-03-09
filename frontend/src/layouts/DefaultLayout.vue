<template>
  <NavBar />
  <main>
    <slot />
  </main>
  <AppFooter />
</template>

<script setup>
import NavBar from '@/components/common/NavBar.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>
