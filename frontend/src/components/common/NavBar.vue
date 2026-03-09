<template>
  <nav class="navbar" :style="{ background: navBg }">
    <a href="#" class="nav-logo">
      <div class="nav-logo-icon">SE</div>
      <span class="nav-logo-text">S.E.T.O</span>
    </a>
    <ul class="nav-links">
      <li><a href="#features">주요 기능</a></li>
      <li><a href="#stats">운영 현황</a></li>
      <li><a href="#login" class="nav-cta">로그인</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navBg = ref('var(--color-bg-nav)')

function onScroll() {
  navBg.value = window.scrollY > 50
    ? 'var(--color-bg-nav-scroll)'
    : 'var(--color-bg-nav)'
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border-nav);
  transition: background 0.3s;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.nav-logo-icon {
  width: 36px;
  height: 36px;
  background: var(--color-primary);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  color: var(--color-text-white);
  letter-spacing: 1px;
}

.nav-logo-text {
  font-size: 18px;
  font-weight: 800;
  color: var(--color-text-white);
  letter-spacing: 2px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
}

.nav-links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--color-text-white);
}

.nav-cta {
  padding: 10px 24px;
  background: var(--color-primary);
  color: var(--color-text-white) !important;
  border-radius: var(--radius-sm);
  font-weight: 600 !important;
  transition: background 0.2s, transform 0.1s !important;
}

.nav-cta:hover {
  background: var(--color-primary-hover) !important;
  transform: translateY(-1px);
}

@media (max-width: 900px) {
  .nav-links {
    display: none;
  }
}
</style>
