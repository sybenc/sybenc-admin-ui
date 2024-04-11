<script setup lang="ts">
import {useLowCodeStore} from "@/store/lowcode";
import {Icon} from "@iconify/vue";
import {toRef} from "vue";

const store = useLowCodeStore()
const {canvas, setCanvasCurrentSelected} = store
const canvasCurrentSelected = toRef(store, 'canvasCurrentSelected')

</script>

<template>
  <div>
    <div
        v-for="(_, index) in canvas.data"
        :key="canvas.data[canvas.data.length-1-index].id"
        class="flex gap-1 px-3 w-full h-6 items-center justify-start rounded"
        :class="canvasCurrentSelected?.id===canvas.data[canvas.data.length-1-index].id?'bg-primary text-white':'hover:bg-secondary'"
        @click.stop.prevent="setCanvasCurrentSelected(canvas.data[canvas.data.length-1-index])">
      <Icon :icon="canvas.data[canvas.data.length-1-index].icon" class="size-4"
            :color="canvasCurrentSelected?.id===canvas.data[canvas.data.length-1-index].id?'white':'hsl(var(--primary))'"></Icon>
      <span style="font-size: 14px; line-height: 32px;">{{ canvas.data[canvas.data.length-1-index].label }}</span>
    </div>
  </div>
</template>

<style scoped lang="css">
</style>