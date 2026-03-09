<template>
  <div class="login-card" id="login">
    <div class="login-card-header">
      <div class="login-card-title">로그인</div>
      <div class="login-card-subtitle">사원번호와 비밀번호를 입력하세요</div>
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
          placeholder="비밀번호를 입력하세요"
          autocomplete="current-password"
          required
        />
      </div>

      <div class="auto-login">
        <label>
          <input v-model="autoLogin" type="checkbox" />
          자동 로그인
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

    <div class="login-divider">또는</div>

    <button class="btn-sso" @click="handleSSO">
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
    // TODO: router.push('/dashboard') after dashboard page exists
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
  border-radius: var(--radius-lg);
  padding: 40px 32px;
  box-shadow: var(--shadow-card);
}

.login-card-header {
  text-align: center;
  margin-bottom: 28px;
}

.login-card-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 4px;
}

.login-card-subtitle {
  font-size: 13px;
  color: var(--color-text-subtle);
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-body);
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid var(--color-border-input);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--color-text-body);
  background: var(--color-surface-input);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.form-input::placeholder {
  color: var(--color-text-placeholder);
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(107, 92, 231, 0.12);
  background: var(--color-surface-card);
}

.auto-login {
  text-align: center;
  margin-bottom: 20px;
}

.auto-login label {
  font-size: 13px;
  color: var(--color-text-subtle);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.auto-login input[type="checkbox"] {
  accent-color: var(--color-primary);
  width: 14px;
  height: 14px;
}

.btn-login {
  width: 100%;
  padding: 14px;
  background: var(--color-bg-dark);
  color: var(--color-text-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  letter-spacing: 0.5px;
}

.btn-login:hover {
  background: var(--color-bg-dark-hover);
}

.btn-login:active {
  transform: scale(0.98);
}

.btn-login.loading {
  pointer-events: none;
  opacity: 0.8;
}

.btn-login.loading::after {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-left: 8px;
  vertical-align: middle;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-divider {
  text-align: center;
  margin: 16px 0;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 500;
}

.btn-sso {
  width: 100%;
  padding: 12px;
  background: var(--color-surface-card);
  color: var(--color-text-body);
  border: 1.5px solid var(--color-border-input);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-sso:hover {
  border-color: var(--color-primary);
  background: var(--color-surface-hover);
}

.password-recovery {
  text-align: center;
  margin-top: 14px;
}

.password-recovery a {
  font-size: 13px;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.password-recovery a:hover {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .login-card {
    max-width: 420px;
    margin: 0 auto;
  }
}
</style>
