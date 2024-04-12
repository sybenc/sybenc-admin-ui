<script lang="ts" setup>
import {
  LowCodeBar,
  LowCodeCanvas,
  LowCodeZIndexList,
  LowCodeComponentList
} from "@/components/base/lowcode"
import {LowCodeTool} from "@/components/base/lowcode";
</script>

<template>
  <div class="h-full">
    <LowCodeBar/>
    <div class="flex low-code-content">
      <div class="flex flex-col w-1/6 h-full low-code-component box-border">
        <LowCodeComponentList class="flex flex-col gap-1 p-2 h-1/2 overflow-scroll box-border"/>
        <LowCodeZIndexList class="flex flex-col gap-1 p-2 h-1/2 overflow-scroll box-border low-code-canvas-list"/>
      </div>
      <LowCodeCanvas class="flex flex-col w-4/6 gap-4 p-4"/>
      <LowCodeTool class="flex-1 w-1/6 low-code-style box-border"/>
    </div>
  </div>
</template>

<style scoped lang="css">
.low-code-content {
  height: calc(100% - 50px);
}

.low-code-component {
  border-right: solid 1px #E4E4E4;
}

.low-code-canvas-list {
  border-top: solid 1px #E4E4E4;
}

.low-code-style {
  border-left: solid 1px #E4E4E4;
}
</style>

