<template>
  <section class="hero" id="hero">
    <div class="hero-bg-circle hero-bg-circle-1"></div>
    <div class="hero-bg-circle hero-bg-circle-2"></div>

    <div class="hero-content">
      <LoginCard />
    </div>
  </section>
</template>

<script setup>
import LoginCard from './LoginCard.vue'
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  overflow: hidden;
  background-color: var(--color-primary); /* #201F6E */
}

.hero-bg-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.hero-bg-circle-1 {
  width: 800px;
  height: 800px;
  top: -200px;
  right: -200px;
  background: radial-gradient(circle, rgba(91, 79, 207, 0.15), transparent 70%);
}

.hero-bg-circle-2 {
  width: 700px;
  height: 700px;
  bottom: -150px;
  left: -200px;
  background: radial-gradient(circle, rgba(91, 79, 207, 0.1), transparent 70%);
}

.hero-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

@media (max-width: 900px) {
  .hero {
    padding: 20px;
  }
}
</style>

