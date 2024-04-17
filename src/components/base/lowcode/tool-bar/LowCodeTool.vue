<script setup lang="ts">
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";
import {toRef} from "vue";
import {lowCodeToolComponent} from "@/components/base/lowcode/tool-bar/index.ts";
import LowCodeToolHistory from "@/components/base/lowcode/tool-bar/LowCodeToolHistory.vue";

const store = useLowCodeCanvasStore()
const toolBarController = toRef(store, 'toolBarController')
const historyOperationShow = toRef(store, 'historyOperationShow')
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <component :class="historyOperationShow?'h-1/2':'h-full'"  :is="lowCodeToolComponent[toolBarController]"></component>
    <LowCodeToolHistory class="flex-1 history" v-show="historyOperationShow"></LowCodeToolHistory>
  </div>
</template>

<style scoped lang="css">
.history {
  border-top: 1px solid #E4E4E4;
}
</style>