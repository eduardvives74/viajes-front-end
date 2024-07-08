import './assets/estilos.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ListaViajes from './components/ListaViajes/ListaViajes.vue'

const app = createApp(App)

app.component('ListaViajes', ListaViajes)
app.use(createPinia())
app.use(router)

app.mount('#app')
