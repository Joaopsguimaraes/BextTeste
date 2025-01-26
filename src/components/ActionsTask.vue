<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Button from './ui/Button.vue'

const router = useRouter()

async function navigateToCreateTask() {
  await router.push({
    name: 'task-create',
  })
}
</script>
<template>
  <div class="w-full flex flex-col md:flex-row md:justify-between gap-2 items-center">
    <span class="text-2xl font-medium text-blue-900">Gerenciamento de tarefas</span>
    <div>
      <Button @click="navigateToCreateTask" class="px-5">Cadastrar tarefa</Button>
    </div>
  </div>
</template>
