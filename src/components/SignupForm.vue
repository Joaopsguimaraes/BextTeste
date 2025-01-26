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

const validationSchema = toTypedSchema(signupSchema)

const { handleSubmit, errors } = useForm({ validationSchema })
const { value: name } = useField<string>('name')
const { value: username } = useField<string>('username')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const toast = useToast()
const router = useRouter()
const user = useUserStore()

const onSubmit = handleSubmit(async (values: SignupFields) => {
  try {
    await UserService.createUser(values)
    const userCreated = await UserService.getUserByEmail(values.email)

    if (!userCreated) return

    toast.success('Cadastro realizado, Bem vindo!')
    user.addUser(userCreated)

    await router.push('/')
  } catch (error) {
    toast.error(error)
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
    <div class="w-full flex flex-col gap-1 items-center">
      <Button @click="onSubmit" class="w-full"> Registrar </Button>
      <Button @click="handleSignin" class="w-full" intent="secondary"> Entrar </Button>
    </div>
  </SignContainer>
</template>
