<script setup lang="ts">
import {toRef} from "vue"
import {useLowCodeStore} from "@/store/lowcode";
import {InputNumber} from "@/components/ui/input-number";
const props = defineProps({
  disabled: {type: Boolean, default: false}
})
const {disabled} = props

const store = useLowCodeStore()
const {canvas} = store
const index = toRef(store, 'currentSelectedComponentIndex')
</script>

<template>
  <div class="relative grid grid-cols-2 gap-4 py-1">
    <InputNumber v-model="canvas.data[index].style.top" prefix="X" :disabled="disabled"/>
    <InputNumber v-model="canvas.data[index].style.left" prefix="Y" :disabled="disabled"/>
  </div>
</template>

<style scoped lang="css">

</style>