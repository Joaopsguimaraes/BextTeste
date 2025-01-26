import './assets/main.css'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import LocalStoragePlugin from './stores/local-storage-plugin'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
pinia.use(LocalStoragePlugin)
app.use(router)
app.use(Toast)

app.mount('#app')
