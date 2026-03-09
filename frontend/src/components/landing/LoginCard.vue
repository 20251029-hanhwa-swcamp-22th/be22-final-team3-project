<template>
  <div class="login-card" id="login">
    <div class="login-card-header">
      <div class="brand-logo">SE</div>
      <h2 class="brand-title">S.E.T.O</h2>
      <p class="brand-subtitle">Smart Equipment & Talent Orchestrator</p>
    </div>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label class="form-label" for="employeeId">사원번호</label>
        <input
          v-model="employeeId"
          class="form-input"
          type="text"
          id="employeeId"
          placeholder="EMP-2024-001"
          autocomplete="username"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="password">비밀번호</label>
        <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="••••••••"
          autocomplete="current-password"
          required
        />
      </div>

      <div class="form-options">
        <label class="auto-login">
          <input v-model="autoLogin" type="checkbox" />
          <span>자동 로그인</span>
        </label>
      </div>

      <button
        type="submit"
        class="btn-login"
        :class="{ loading }"
        :style="successStyle"
      >
        {{ buttonText }}
      </button>
    </form>

    <div class="login-divider">
      <span class="divider-line"></span>
      <span class="divider-text">또는</span>
      <span class="divider-line"></span>
    </div>

    <button class="btn-sso" @click="handleSSO">
      <svg class="sso-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16M9 13h0m0 4h0m6-4h0m0 4h0" />
      </svg>
      사내 SSO로 로그인
    </button>

    <div class="password-recovery">
      <a href="#" @click.prevent="handlePasswordRecovery">비밀번호 찾기</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { requestPasswordReset } from '@/services/authService'
import { useToast } from '@/composables/useToast'

const authStore = useAuthStore()
const { showToast } = useToast()

const employeeId = ref('')
const password = ref('')
const autoLogin = ref(false)
const loading = ref(false)
const success = ref(false)

const buttonText = computed(() => {
  if (loading.value) return '로그인 중'
  if (success.value) return '로그인 성공'
  return '로그인'
})

const successStyle = computed(() =>
  success.value ? { background: 'var(--color-success)' } : {}
)

async function handleLogin() {
  loading.value = true
  try {
    const user = await authStore.login(employeeId.value.trim(), password.value)
    showToast(`${user.name}님 환영합니다! (${user.role} / ${user.tier}-Tier)`)
    success.value = true
  } catch (err) {
    showToast(err.message, true)
  } finally {
    loading.value = false
  }
}

function handleSSO() {
  showToast('사내 SSO 인증 페이지로 이동합니다...')
}

async function handlePasswordRecovery() {
  try {
    const result = await requestPasswordReset(employeeId.value.trim())
    showToast(result.message)
  } catch (err) {
    showToast(err.message, true)
  }
}
</script>

<style scoped>
.login-card {
  background: var(--color-surface-card);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: var(--shadow-card);
  width: 100%;
  max-width: 480px;
  border: 1px solid var(--color-border-light);
}

.login-card-header {
  text-align: center;
  margin-bottom: 36px;
}

.brand-logo {
  width: 48px;
  height: 48px;
  background: var(--color-primary);
  color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  margin: 0 auto 16px;
}

.brand-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 4px;
  letter-spacing: 1px;
}

.brand-subtitle {
  font-size: 13px;
  color: var(--color-text-muted);
  font-weight: 500;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 8px;
  text-align: left;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--color-border-input);
  border-radius: var(--radius-md);
  font-size: 15px;
  color: var(--color-text-body);
  background: #fff;
  transition: all 0.2s;
  outline: none;
}

.form-input::placeholder {
  color: var(--color-text-placeholder);
}

.form-input:focus {
  border-color: var(--color-primary-light);
  box-shadow: 0 0 0 4px rgba(91, 79, 207, 0.08);
}

.form-options {
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-start;
}

.auto-login {
  font-size: 13px;
  color: var(--color-text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.auto-login input[type="checkbox"] {
  accent-color: var(--color-primary);
  width: 16px;
  height: 16px;
}

.btn-login {
  width: 100%;
  padding: 16px;
  background: var(--color-primary);
  color: var(--color-text-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}

.btn-login:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}

.btn-login:active {
  transform: translateY(0);
}

.btn-login.loading {
  pointer-events: none;
  opacity: 0.8;
}

.login-divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  gap: 12px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: var(--color-border-light);
}

.divider-text {
  font-size: 13px;
  color: var(--color-text-faint);
  font-weight: 500;
}

.btn-sso {
  width: 100%;
  padding: 14px;
  background: #fff;
  color: var(--color-primary);
  border: 1px solid var(--color-border-input);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-sso:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-primary-light);
}

.sso-icon {
  width: 18px;
  height: 18px;
}

.password-recovery {
  text-align: center;
  margin-top: 20px;
}

.password-recovery a {
  font-size: 13px;
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.password-recovery a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px;
    border-radius: 0;
    border: none;
    box-shadow: none;
  }
}
</style>

