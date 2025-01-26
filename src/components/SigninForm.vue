<script setup lang="ts">
import Input from '@/components/AppInput.vue'
import Field from '@/components/AppField.vue'
import Button from '@/components/AppButton.vue'
import SignContainer from '@/layouts/SignContainer.vue'

import { useSignin } from '@/composables/useSignin'
import { useSigninForm } from '@/composables/useSigninForm'

const { signin, navigateToSignup, loading } = useSignin()

const { handleSubmit, errors, defineField } = useSigninForm(signin)

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')
</script>

<template>
  <SignContainer title="Bem vindo! Realize o login">
    <Field id="email" label="Email" required :error="errors.email">
      <Input type="email" placeholder="Digite seu email..." v-model="email" v-bind="emailProps" />
    </Field>
    <Field id="password" label="Password" required :error="errors.password">
      <Input type="password" placeholder="*********" v-model="password" v-bind="passwordProps" />
    </Field>
    <div class="w-full flex flex-col gap-2 items-center">
      <Button @click="handleSubmit" class="w-full" :loading="loading"> Entrar </Button>
      <Button @click="navigateToSignup" class="w-full" variant="secondary"> Registra-se </Button>
    </div>
  </SignContainer>
</template>
