<script setup lang="ts">
import Input from '@/components/ui/Input.vue'
import Field from '@/components/ui/Field.vue'
import Button from '@/components/ui/Button.vue'
import { useRouter } from 'vue-router'
import { UserService } from '@/service/http-client'
import { useUserStore } from '@/stores/user'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { signupSchema } from '@/validations/signup-schema'
import type { SignupFields } from '@/@types/signup-fields'
import SignContainer from './ui/SignContainer.vue'
import { ref } from 'vue'

const toast = useToast()
const router = useRouter()
const user = useUserStore()
const loading = ref<boolean>(false)
const validationSchema = toTypedSchema(signupSchema)
const { handleSubmit, errors } = useForm({ validationSchema })
const { value: name } = useField<string>('name')
const { value: username } = useField<string>('username')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

async function registerUser(values: SignupFields) {
  const existingUser = await UserService.getUserByEmail(values.email)

  if (existingUser) {
    throw new Error('Usuário já cadastrado!')
  }

  return await UserService.createUser(values)
}

const onSubmit = handleSubmit(async (values: SignupFields) => {
  try {
    loading.value = true
    const userCreated = await registerUser(values)

    user.addUser(userCreated)

    toast.success('Cadastro realizado, Bem vindo!')
    await router.push('/')
  } catch (error) {
    loading.value = false
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Erro ao realizar cadastro')
    }
  } finally {
    loading.value = false
  }
})

async function handleSignin(): Promise<void> {
  await router.push('/signin')
}
</script>

<template>
  <SignContainer title="Bem vindo! Registra-se">
    <Field id="name" label="Nome" required :error="errors.name">
      <Input type="name" placeholder="Digite seu nome..." v-model="name" />
    </Field>
    <Field id="username" label="Username" required :error="errors.username">
      <Input type="username" placeholder="Digite seu username..." v-model="username" />
    </Field>
    <Field id="email" label="Email" required :error="errors.email">
      <Input type="email" placeholder="Digite seu email..." v-model="email" />
    </Field>
    <Field id="password" label="Password" required :error="errors.password">
      <Input type="password" placeholder="*********" v-model="password" />
    </Field>
    <div class="w-full flex flex-col gap-2 items-center">
      <Button @click="onSubmit" class="w-full" :loading="loading" v-disabled="loading">
        Registrar
      </Button>
      <Button
        @click="handleSignin"
        class="w-full"
        intent="secondary"
        :loading="loading"
        :disabled="loading"
      >
        Entrar
      </Button>
    </div>
  </SignContainer>
</template>
