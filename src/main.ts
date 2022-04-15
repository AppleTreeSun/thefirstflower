import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './global'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store'

const app = createApp(App)
app.use(global)
setupStore()
app.use(router)
app.use(store)
app.mount('#app')
