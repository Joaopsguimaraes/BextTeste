import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { UserService } from '@/helpers/user-service'
import { useUserStore } from '@/stores/user'
import type { SignupInput } from '@/types/signup-input'
import { RoutesNames } from '@/constants/routes-names-enum'

export function useSignup() {
  const router = useRouter()
  const toast = useToast()
  const userStore = useUserStore()
  const loading = ref(false)

  async function registerUser(values: SignupInput) {
    const existingUser = await UserService.getUserByEmail(values.email)

    if (existingUser) {
      throw new Error('Usuário já cadastrado!')
    }

    const userCreated = await UserService.createUser(values)
    return userCreated
  }

  async function signup(values: SignupInput) {
    try {
      loading.value = true

      const userCreated = await registerUser(values)

      userStore.addUser(userCreated)

      toast.success('Cadastro realizado, Bem vindo!')

      await router.push({ name: RoutesNames.HOME })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao realizar cadastro'

      toast.error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  function navigateToSignin() {
    router.push({ name: RoutesNames.SIGNIN })
  }

  return {
    signup,
    navigateToSignin,
    loading,
  }
}
