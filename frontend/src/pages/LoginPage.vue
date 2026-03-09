<template>
  <DefaultLayout>
    <HeroSection />
    <FeaturesSection />
    <StatsSection />
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import FeaturesSection from '@/components/landing/FeaturesSection.vue'
import StatsSection from '@/components/landing/StatsSection.vue'
</script>
