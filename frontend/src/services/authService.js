import api from './api'

// Demo credentials — remove when backend is connected
const DEMO_USERS = {
  'EMP-2024-001': { password: 'password', name: '손창우', role: 'Technician', tier: 'S' },
  'EMP-2024-002': { password: 'password', name: '김신우', role: 'Team Leader', tier: 'A' },
  'EMP-2024-003': { password: 'password', name: '황자현', role: 'HR Manager', tier: 'A' },
  'ADMIN':        { password: 'admin',    name: '관리자',  role: 'Admin',       tier: '-' },
}

function simulateDelay(ms = 1200) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function login(employeeId, password) {
  // TODO: Replace with real API call → api.post('/auth/login', { employeeId, password })
  await simulateDelay()

  const user = DEMO_USERS[employeeId]
  if (user && user.password === password) {
    return { name: user.name, role: user.role, tier: user.tier, employeeId }
  }
  throw new Error('사원번호 또는 비밀번호가 올바르지 않습니다.')
}

export async function loginSSO() {
  // TODO: Replace with real SSO redirect → api.get('/auth/sso')
  await simulateDelay(500)
  throw new Error('SSO 연동 준비 중입니다.')
}

export async function requestPasswordReset(employeeId) {
  // TODO: Replace with real API call → api.post('/auth/password-reset', { employeeId })
  await simulateDelay(500)
  return { message: '비밀번호 재설정 링크가 등록된 이메일로 발송됩니다.' }
}

export { api }
