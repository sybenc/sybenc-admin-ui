<script setup lang="ts">
import {Icon} from "@iconify/vue"
import {ref, toRef} from "vue"
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";
import {InputNumber} from "@/components/ui/input-number";
const store = useLowCodeCanvasStore()
const {canvas} = store
const index = toRef(store, 'currentSelectedComponentIndex')
const props = defineProps({
  disabled: {type: Boolean, default: false}
})
const {disabled} = props
const isLinkWH = ref<boolean>(false)

function handleClickLock(){
  if(!disabled) isLinkWH.value = !isLinkWH.value
}

function handleWInput(){
  if(isLinkWH.value) {
    canvas.data[index.value].style.height = canvas.data[index.value].style.width
  }
}

function handleHInput(){
  if(isLinkWH.value) {
    canvas.data[index.value].style.width = canvas.data[index.value].style.height
  }
}
</script>

<template>
  <div class="relative grid grid-cols-2 gap-4 py-1">
    <InputNumber v-model="canvas.data[index].style.width" prefix="W" @input="handleWInput"/>
    <Icon :icon="`fluent:lock-${isLinkWH?'closed':'open'}-28-filled`"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-3.5"
          :class="disabled? 'cursor-not-allowed': ''"
          @click.stop="handleClickLock"
          :color="isLinkWH?'hsl(var(--primary))':'black'"/>
    <InputNumber v-model="canvas.data[index].style.height" prefix="H" @input="handleHInput"/>
  </div>
</template>

<style scoped lang="css">

</style>