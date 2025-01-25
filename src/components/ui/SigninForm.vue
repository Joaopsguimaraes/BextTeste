<script setup lang="ts">
import { LogIn } from 'lucide-vue-next'
import Input from '@/components/ui/Input.vue'
import Field from '@/components/ui/Field.vue'
import Button from '@/components/ui/Button.vue'
import { useRouter } from 'vue-router'
import { getUserByEmail } from '@/service/http-client'
import { useUserStore } from '@/stores/user'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { z } from 'zod'
import type { SigninFields } from '@/@types/signin-fields'
import SignContainer from './SignContainer.vue'

const signinSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Email é obrigatório').email('Precisa ser um email valido'),
    password: z.string().min(8, 'Senha muito curta'),
  }),
)

const { handleSubmit, errors } = useForm({ validationSchema: signinSchema })
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const toast = useToast()
const router = useRouter()
const user = useUserStore()

const onSubmit = handleSubmit(async (values: SigninFields) => {
  const userSignin = await getUserByEmail(values.email as string)

  if (!userSignin) {
    toast.error('Usuário não encontrado, favor registra-se')
    return
  }

  user.addUser(userSignin)
  await router.push('/')
})

async function handleRegister(): Promise<void> {
  await router.push('/')
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
    <div class="w-full flex flex-col gap-1 items-center">
      <Button @click="onSubmit" class="w-full">
        <LogIn />
        Entrar
      </Button>
      <Button @click="handleRegister" class="w-full" intent="secondary" disabled>
        Registra-se
      </Button>
    </div>
  </SignContainer>
</template>
