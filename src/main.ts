import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "@/locale";
import router from "@/router";
import {createPinia} from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
    .use(router)
    .use(pinia)
app.mount('#app')
