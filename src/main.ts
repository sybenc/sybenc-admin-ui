import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "@/locale";
import router from "@/router";
import {createPinia} from 'pinia'
//颜色选择器
import { VueColor } from 'vue-color-next'
import '@/assets/color-picker.css'


const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
    .use(router)
    .use(pinia)
    .use(VueColor)
app.mount('#app')
