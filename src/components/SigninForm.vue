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
import type { SigninFields } from '@/@types/signin-fields'
import SignContainer from './ui/SignContainer.vue'
import { signinSchema } from '@/validations/signin-schema'

const toast = useToast()
const router = useRouter()
const user = useUserStore()
const validationSchema = toTypedSchema(signinSchema)
const { handleSubmit, errors } = useForm({ validationSchema })
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

async function validadeUser(values: SigninFields) {
  const userSignin = await UserService.getUserByEmail(values.email)

  if (!userSignin) {
    throw new Error('Usuário não encontrado, favor registra-se')
  }

  return userSignin
}

const onSubmit = handleSubmit(async (values: SigninFields) => {
  try {
    const userSignin = await validadeUser(values)

    user.addUser(userSignin)
    await router.push('/')
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('Erro ao realizar cadastro')
    }
  }
})

async function handleRegister(): Promise<void> {
  await router.push('/signup')
}
</script>

<template>
  <SignContainer title="Bem vindo! Realize o login">
    <Field id="email" label="Email" required :error="errors.email">
      <Input type="email" placeholder="Digite seu email..." v-model="email" />
    </Field>
    <Field id="password" label="Password" required :error="errors.password">
      <Input type="password" placeholder="*********" v-model="password" />
    </Field>
    <div class="w-full flex flex-col gap-2 items-center">
      <Button @click="onSubmit" class="w-full">Entrar</Button>
      <Button @click="handleRegister" class="w-full" intent="secondary">Registra-se</Button>
    </div>
  </SignContainer>
</template>
