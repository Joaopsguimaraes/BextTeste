import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { UserService } from '@/helpers/user-service'
import { useUserStore } from '@/stores/user'
import type { SigninInput } from '@/types/signin-input'
import { RoutesNames } from '@/constants/routes-names-enum'

export function useSignin() {
  const router = useRouter()
  const toast = useToast()
  const userStore = useUserStore()
  const loading = ref(false)

  async function validateUser(values: SigninInput) {
    const userSignin = await UserService.getUserByEmail(values.email)

    if (!userSignin) {
      throw new Error('Usuário não encontrado, favor registra-se')
    }

    return userSignin
  }

  async function signin(values: SigninInput) {
    try {
      loading.value = true
      const userSignin = await validateUser(values)

      userStore.addUser(userSignin)

      await router.push('/')

      toast.success('Login realizado com sucesso!')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao realizar login'

      toast.error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  function navigateToSignup() {
    router.push({ name: RoutesNames.SIGNUP })
  }

  return {
    signin,
    navigateToSignup,
    loading,
  }
}
