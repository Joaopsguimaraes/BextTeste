# Aplicação com Vue de gerenciamento de tarefas

## 📋 Sobre o Projeto

Desenvolver uma aplicação web de gerenciamento de tarefas. A aplicação deve permitir que os usuários criem, editem e excluam tarefas, bem como visualizar o status de cada tarefa em diferentes listas. Este é um aplicativo desenvolvido com Vue 3, TypeScript e várias bibliotecas de suporte para criar uma experiência de usuário robusta e moderna.

## 🚀 Tecnologias Utilizadas

### Principais Tecnologias

- Vue 3 (Composition API)
- TypeScript
- Vite
- Vue Router
- Pinia (Gerenciamento de Estado)
- Tailwind CSS
- Json server (mock de dados)
- Axios

### Bibliotecas de Validação e Formulários

- Vee-Validate
- Zod (Validação de Esquemas)

### Bibliotecas Adicionais

- Vue Toastification (Notificações)
- Date-fns (Manipulação de Datas)
- Lucide Vue (Ícones)
- Class Variance Authority (Variantes para os componentes)

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios

```
src/
│
├── assets/             # Recursos estáticos
├── components/         # Componentes reutilizáveis
│   ├── AppButton.vue
│   ├── AppInput.vue
│   └── ...
│
├── composables/        # Hooks personalizados do Vue
│   ├── useCreateTask.ts
│   ├── useEditTask.ts
│   └── ...
│
├── constants/          # Constantes do projeto
│   ├── category-options.ts
│   └── routes-names-enum.ts
│
├── helpers/            # Serviços e utilitários
│   ├── http-client.ts
│   ├── task-service.ts
│   └── user-service.ts
│
├── layouts/            # Layouts de página
│   ├── HeaderApplication.vue
│   └── SignContainer.vue
│
├── mocks/            # Arquivo de mock da aplicação
│   └── db.json
│
├── router/           # Gerenciamento de rotas da aplicação
│   ├── auth-guard.ts
│   └── index.ts
│
├── stores/           # Gerenciamento de estado com Pinia
│   ├── local-storage-plugin.ts
│   └── user.ts
│
├── types/            # Definições de tipos TypeScript
│   ├── task.ts
│   └── user.ts
│
├── validations/        # Esquemas de validação Zod
│   ├── create-task-schema.ts
│   └── signin-schema.ts
│
└── views/              # Componentes de página
    ├── SigninView.vue
    ├── SignupView.vue
    └── TaskListView.vue
```

## ✨ Funcionalidades

### Gerenciamento de Tarefas

- Criação de tarefas
- Edição de tarefas
- Exclusão de tarefas
- Filtragem de tarefas por nome, categoria e prioridade

### Autenticação de Usuário

- Registro de novos usuários
- Login de usuários
- Validação de formulários
- Gerenciamento de estado de usuário
- Gerenciamento de rotas privadas

## 🔧 Configuração do Projeto

### Pré-requisitos

- Node.js (versão 20 ou superior)
- npm

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/Joaopsguimaraes/BextTeste.git
```

2. Instale as dependências

```bash
cd BextTeste
npm install
```

3. Copie o arquivo de ambiente

```bash
cp .env.example .env
```

4. Inicie o servidor de mock

```bash
npm run mock
```

5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run mock`: Inicia o mock da aplicação com json-server
- `npm run build`: Compila o projeto para produção
- `npm run preview`: Visualiza a build de produção localmente
- `npm run test`: Executa os testes unitários
- `npm run lint`: Executa o linter

## 🔒 Variáveis de Ambiente

Crie um arquivo `.env` com as seguintes configurações:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📝 Padrões de Desenvolvimento

### Composables

- Utilização de Composition API
- Separação de responsabilidades
- Reutilização de lógica

### Componentes

- Componentes pequenos e focados
- Utilização de props e eventos
- Componentização de elementos comuns

### Gerenciamento de Estado

- Utilização do Pinia para estado global
- Utilização de local storage com Pinia
- Módulos de store específicos para cada contexto

## ✍️ Autor

João Guimarães - joaovpsguimaraes@gmail.com

Link do Projeto: [https://github.com/Joaopsguimaraes/BextTeste](https://github.com/Joaopsguimaraes/BextTeste)

## 🎉 Aprendizados

Utilização da Composition API em todo projeto.
Utilização de Provide / Inject para fornecer valores para componentes descendentes
Utilização do pinia, aprofundando em conhecimentos com a storage.
Criação do auth guard para manter rotas privadas protegidas.
Utilização da local storage para manter dados do usuário, mesmo caso a aplicação reinicie.
Criação de componentes de formulário de forma reaproveitada em qualquer parte do projeto.
Validação reativa com vee-validate e zod.
Componentes reaproveitável como TaskForm sendo utilizado para criar e editar uma task.
Criação e utilizações de hooks para deixar o componente mais limpo e a logica aplica nos hooks.
Criação de helpers para serviços e utilitários também deixando o código mais limpo e estruturado.
