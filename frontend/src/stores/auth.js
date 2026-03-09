import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authService from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.name ?? '')
  const userRole = computed(() => user.value?.role ?? '')

  async function login(employeeId, password) {
    const userData = await authService.login(employeeId, password)
    user.value = userData
    // TODO: Store real token from API response
    // token.value = response.token
    // localStorage.setItem('token', response.token)
    return userData
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  return { user, token, isAuthenticated, userName, userRole, login, logout }
})
