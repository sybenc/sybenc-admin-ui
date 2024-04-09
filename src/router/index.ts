import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/views/Home.vue";
import Plugin from "@/views/Plugin.vue";
import Notification from "@/views/Notification.vue";
import Gallery from "@/views/Gallery.vue";
import Menu from "@/views/system/Menu.vue";
import Dictionary from "@/views/system/Dictionary.vue";
import OperationHistory from "@/views/tool/OperationHistory.vue";
import Permission from "@/views/system/Permission.vue";
import User from "@/views/system/User.vue";
import Custom from "@/views/tool/Custom.vue";
import LowCode from "@/views/tool/LowCode.vue";
import Monitor from "@/views/tool/Monitor.vue";
import Setting from "@/views/system/Setting.vue";
import Profile from "@/views/account/Profile.vue";
import Security from "@/views/account/Security.vue";
import Internationalization from "@/views/tool/Internationalization.vue";
import Article from "@/views/system/Article.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/gallery', component: Gallery},
    {path: '/notification', component: Notification},
    {path: '/plugin', component: Plugin},
    {
        path: '/account',
        children: [
            {
                path: 'profile',
                component: Profile
            },
            {
                path: 'security',
                component: Security
            },
            {
                path: 'monitor',
                component: Monitor
            },
            {
                path: 'setting',
                component: Setting
            }
        ]
    },
    {
        path: '/system',
        children: [
            {
                path: 'menu',
                component: Menu
            },
            {
                path: 'dictionary',
                component: Dictionary
            },
            {
                path: 'permission',
                component: Permission
            },
            {
                path: 'user',
                component: User
            },
            {
                path: 'setting',
                component: Setting
            },
            {
                path: 'article',
                component: Article
            }
        ]
    },
    {
        path: '/tool',
        children: [
            {
                path: 'custom',
                component: Custom
            },
            {
                path: 'low-code',
                component: LowCode
            },
            {
                path: 'monitor',
                component: Monitor
            },
            {
                path: 'internationalization',
                component: Internationalization
            },
            {
                path: 'operation-history',
                component: OperationHistory
            },
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
