import {createI18n} from 'vue-i18n'
import zh from "@/locale/lang/zh.ts";
import en from "@/locale/lang/en.ts"

const messages = {
    en,
    zh,
}
//从浏览器获取语言
const language = (navigator.language || 'en').toLocaleLowerCase()
const i18n = createI18n({
    // 首先从缓存里拿，没有的话就用浏览器语言，
    locale: localStorage.getItem('lang') || language.split('-')[0] || 'en',
    // 设置备用语言
    fallbackLocale: 'en',
    messages,
})

export default i18n