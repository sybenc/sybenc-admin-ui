<script setup lang="ts">
import {NavigationGroup} from "@/components/base/layout";

const data1 = [
  {title: '用户管理', to: '/system/user', icon: 'fluent:person-28-regular'},
  {title: '权限管理', to: '/system/permission', icon: 'fluent:person-passkey-28-regular'},
  {title: '菜单管理', to: '/system/menu', icon: 'fluent:grid-28-regular'},
  {title: '文章管理', to: '/system/article', icon: 'fluent:signature-28-regular'},
  {title: '字典管理', to: '/system/dictionary', icon: 'fluent:book-default-28-regular'},
  {title: '系统设置', to: '/system/setting', icon: 'fluent:settings-28-regular'},
]
const data2 = [
  {title: '首页', to: '/', icon: 'fluent:home-28-regular'},
  {title: '图库', to: '/gallery', icon: 'fluent:image-28-regular'},
  {title: '插件', to: '/plugin', icon: 'fluent:plug-disconnected-28-regular'},
  {title: '通知', to: '/notification', icon: 'fluent:alert-28-regular'}
]

const data3 = [
  {title: '系统监测', to: '/tool/monitor', icon: 'fluent:desktop-pulse-28-regular'},
  {title: '低代码平台', to: '/tool/low-code', icon: 'fluent:code-block-28-regular'},
  {title: '国际化', to: '/tool/internationalization', icon: 'fluent:globe-28-regular'},
  {title: '自定义', to: '/tool/custom', icon: 'fluent:wand-28-regular'},
  {title: '操作历史', to: '/tool/operation-history', icon: 'fluent:history-28-regular'},
]

const data4 = [
  {title: '个人信息', to: '/account/profile', icon: 'fluent:video-person-28-regular'},
  {title: '账户安全', to: '/account/security', icon: 'fluent:shield-task-28-regular'}
]
</script>

<template>
  <NavigationGroup title="通用" :data="data2"></NavigationGroup>
  <NavigationGroup title="系统管理" :data="data1"></NavigationGroup>
  <NavigationGroup title="系统工具" :data="data3"></NavigationGroup>
  <NavigationGroup title="个人中心" :data="data4"></NavigationGroup>
</template>

<style scoped lang="css">

</style>