<template>
  <section class="stats" id="stats">
    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.label">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '1,200+', label: '등록 장비' },
  { value: '350+', label: '관리 인원' },
  { value: '98.5%', label: '장비 가동률' },
  { value: '24/7', label: '실시간 모니터링' },
]
</script>

<style scoped>
.stats {
  padding: 80px 40px;
  background: rgba(107, 92, 231, 0.06);
  border-top: 1px solid rgba(107, 92, 231, 0.1);
  border-bottom: 1px solid rgba(107, 92, 231, 0.1);
}

.stats-grid {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  text-align: center;
}

.stat-value {
  font-size: 40px;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--color-text-dim);
  font-weight: 500;
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
