<script setup lang="ts">
import {useLowCodeStore} from "@/store/lowcode";
import {Icon} from "@iconify/vue";
import {toRef} from "vue";

const store = useLowCodeStore()
const {canvasData, setCanvasCurrentSelected} = store
const canvasCurrentSelected = toRef(store,'canvasCurrentSelected')
</script>

<template>
 <div>
   <div
       v-for="item in canvasData"
       :key="item.id"
       class="flex gap-1 px-3 w-full h-6 items-center justify-start rounded cursor-move"
       :class="canvasCurrentSelected?.id===item.id?'bg-primary text-white':'hover:bg-secondary'"
        @click.stop.prevent="setCanvasCurrentSelected(item)">
     <Icon :icon="item.icon" class="size-4"
           :color="canvasCurrentSelected?.id===item.id?'white':'hsl(var(--primary))'"></Icon>
     <span style="font-size: 14px; line-height: 32px;">{{ item.label }}</span>
   </div>
 </div>
</template>

<style scoped lang="css">
</style>