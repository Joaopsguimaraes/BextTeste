<script setup lang="ts">
import Input from '@/components/AppInput.vue'
import Field from '@/components/AppField.vue'
import Button from '@/components/AppButton.vue'
import SignContainer from '@/layouts/SignContainer.vue'

import { useSignup } from '@/composables/useSignup'
import { useSignupForm } from '@/composables/useSignupForm'

const { signup, navigateToSignin, loading } = useSignup()

const { handleSubmit, errors, defineField } = useSignupForm(signup)

const [name, nameProps] = defineField('name')
const [username, usernameProps] = defineField('username')
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')
</script>

<template>
  <SignContainer title="Bem vindo! Registra-se">
    <Field id="name" label="Nome" required :error="errors.name">
      <Input type="text" placeholder="Digite seu nome..." v-model="name" v-bind="nameProps" />
    </Field>
    <Field id="username" label="Username" required :error="errors.username">
      <Input
        type="text"
        placeholder="Digite seu username..."
        v-model="username"
        v-bind="usernameProps"
      />
    </Field>
    <Field id="email" label="Email" required :error="errors.email">
      <Input type="email" placeholder="Digite seu email..." v-model="email" v-bind="emailProps" />
    </Field>
    <Field id="password" label="Password" required :error="errors.password">
      <Input type="password" placeholder="*********" v-model="password" v-bind="passwordProps" />
    </Field>
    <div class="w-full flex flex-col gap-2 items-center">
      <Button @click="handleSubmit" class="w-full" :loading="loading"> Registrar </Button>
      <Button @click="navigateToSignin" class="w-full" variant="secondary"> Entrar </Button>
    </div>
  </SignContainer>
</template>
