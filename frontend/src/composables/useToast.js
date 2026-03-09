import { ref } from 'vue'

const message = ref('')
const isError = ref(false)
const visible = ref(false)

let hideTimer = null

export function useToast() {
  function showToast(msg, error = false) {
    if (hideTimer) clearTimeout(hideTimer)
    message.value = msg
    isError.value = error
    visible.value = true
    hideTimer = setTimeout(() => {
      visible.value = false
    }, 3000)
  }

  return { message, isError, visible, showToast }
}
