<template>
  <section class="features" id="features">
    <div class="section-header">
      <div class="section-label">Features</div>
      <h2 class="section-title">주요 기능</h2>
      <p class="section-desc">
        장비 운영부터 인력 관리까지, S.E.T.O 하나로 통합 관리하세요.
      </p>
    </div>

    <div class="features-grid">
      <div v-for="feature in features" :key="feature.title" class="feature-card">
        <div class="feature-icon">{{ feature.icon }}</div>
        <div class="feature-title">{{ feature.title }}</div>
        <div class="feature-desc">{{ feature.desc }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: '\u{1F6E0}',
    title: '장비 통합 관리',
    desc: '전사 장비의 등록, 배정, 상태 모니터링을 한눈에 관리합니다. 실시간 가동 현황과 유지보수 이력을 추적할 수 있습니다.',
  },
  {
    icon: '\u{1F465}',
    title: '인력 스케줄링',
    desc: '직원 역량 기반의 자동 매칭과 스케줄 최적화로 인력 배치 효율을 극대화합니다.',
  },
  {
    icon: '\u{1F4CA}',
    title: '데이터 분석',
    desc: '장비 가동률, 인력 활용도, 비용 분석 등 다양한 데이터를 시각화하여 의사결정을 지원합니다.',
  },
  {
    icon: '\u{1F514}',
    title: '알림 & 자동화',
    desc: '유지보수 알림, 일정 변경, 이상 감지 등 주요 이벤트를 자동으로 알려드립니다.',
  },
  {
    icon: '\u{1F512}',
    title: '권한 관리',
    desc: '역할 기반 접근 제어(RBAC)로 부서별, 직급별 맞춤 권한을 안전하게 관리합니다.',
  },
  {
    icon: '\u{1F680}',
    title: '티어 시스템',
    desc: 'S/A/B/C 티어 기반 인력 평가 체계로 성과 관리와 역량 개발을 체계적으로 운영합니다.',
  },
]
</script>

<style scoped>
.features {
  padding: 100px 40px;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary-light);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.section-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}

.section-desc {
  font-size: 16px;
  color: var(--color-text-dim);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}

.features-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  background: var(--color-surface-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: 36px 28px;
  transition: background 0.3s, border-color 0.3s, transform 0.2s, box-shadow 0.3s;
}

.feature-card:hover {
  background: var(--color-primary-bg);
  border-color: var(--color-primary-border);
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: var(--color-primary-bg);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 10px;
}

.feature-desc {
  font-size: 14px;
  color: var(--color-text-dim);
  line-height: 1.65;
}

@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: 1fr;
    max-width: 420px;
  }
}
</style>
