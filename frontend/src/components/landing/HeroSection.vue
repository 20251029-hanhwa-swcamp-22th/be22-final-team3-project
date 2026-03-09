<template>
  <section class="hero" id="hero">
    <div class="hero-bg-circle hero-bg-circle-1"></div>
    <div class="hero-bg-circle hero-bg-circle-2"></div>
    <div class="hero-bg-circle hero-bg-circle-3"></div>

    <div class="hero-content">
      <div class="hero-text">
        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          장비 &middot; 인력 통합 관리 솔루션
        </div>
        <h1 class="hero-title">
          스마트하게 관리하는<br>
          <span class="highlight">장비와 인재</span>
        </h1>
        <p class="hero-desc">
          S.E.T.O는 기업의 장비 운영과 인력 관리를 하나의 플랫폼에서 통합 관리합니다.
          실시간 모니터링, 자동 스케줄링, 데이터 기반 의사결정으로 운영 효율을 극대화하세요.
        </p>
        <div class="hero-actions">
          <a href="#login" class="btn-primary">시작하기 &rarr;</a>
          <a href="#features" class="btn-outline">기능 알아보기</a>
        </div>
      </div>

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
  padding: 120px 40px 80px;
  position: relative;
  overflow: hidden;
}

.hero-bg-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.hero-bg-circle-1 {
  width: 600px;
  height: 600px;
  top: -150px;
  right: -100px;
  background: radial-gradient(circle, var(--color-primary-bg), transparent 70%);
}

.hero-bg-circle-2 {
  width: 500px;
  height: 500px;
  bottom: -120px;
  left: -150px;
  background: radial-gradient(circle, rgba(45, 27, 105, 0.4), transparent 70%);
}

.hero-bg-circle-3 {
  width: 300px;
  height: 300px;
  top: 40%;
  left: 55%;
  background: radial-gradient(circle, rgba(107, 92, 231, 0.08), transparent 70%);
}

.hero-content {
  max-width: 1100px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-primary-bg);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-pill);
  padding: 6px 16px;
  font-size: 13px;
  color: var(--color-primary-light);
  font-weight: 500;
  width: fit-content;
}

.hero-badge-dot {
  width: 6px;
  height: 6px;
  background: var(--color-primary);
  border-radius: 50%;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.25;
  color: var(--color-text-white);
  letter-spacing: -0.5px;
}

.hero-title .highlight {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.btn-primary {
  padding: 14px 32px;
  background: var(--color-primary);
  color: var(--color-text-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}

.btn-outline {
  padding: 14px 32px;
  background: transparent;
  color: var(--color-text-white);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-outline:hover {
  border-color: var(--color-primary-border);
  background: rgba(107, 92, 231, 0.08);
}

@media (max-width: 900px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 48px;
    text-align: center;
  }

  .hero-badge {
    margin: 0 auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-title {
    font-size: 36px;
  }
}
</style>
