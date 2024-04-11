<script setup lang="ts">
import {useLowCodeStore} from "@/store/lowcode";
import {toRef} from "vue";
import {lowCodeToolComponent} from "@/components/base/lowcode/tool-bar/index.ts";
import LowCodeToolHistory from "@/components/base/lowcode/tool-bar/LowCodeToolHistory.vue";

const store = useLowCodeStore()
const toolBarController = toRef(store, 'toolBarController')
const historyOperationShow = toRef(store, 'historyOperationShow')
</script>

<template>
  <div class="grid grid-rows-2 w-full">
    <component :is="lowCodeToolComponent[toolBarController]"></component>
    <LowCodeToolHistory v-show="historyOperationShow" class="history"></LowCodeToolHistory>
  </div>
</template>

<style scoped lang="css">
.history {
  border-top: 1px solid #E4E4E4;
}
</style>