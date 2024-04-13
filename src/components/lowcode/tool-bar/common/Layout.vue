<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {Label} from '@/components/ui/label'
import {useLowCodeStore} from "@/store/lowcode";
import {toRef} from "vue";

const props = defineProps({
  label: {type: String, required: true},
})
const {label} = props
const store = useLowCodeStore()
const {canvas} = store
const index = toRef(store, 'currentSelectedComponentIndex')

function handleClickHorizontal() {
  canvas.data[index.value].propsValue.display = 'vertical'
}

function handleClickVertical() {
  canvas.data[index.value].propsValue.display = 'horizontal'
}
</script>

<template>
  <div class="flex justify-between px-2 py-1">
    <Label class="justify-start text-xs">{{ label }}</Label>
    <div class="grid grid-cols-2 gap-1 items-center justify-end">
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary"
           @click.stop.prevent="handleClickVertical">
        <Icon icon="fluent:align-stretch-vertical-20-filled"
              class="size-4"
              :color="canvas.data[index].propsValue.display === 'horizontal'?'hsl(var(--primary))':''"/>
      </div>
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary"
           @click.stop.prevent="handleClickHorizontal">
        <Icon
            icon="fluent:align-stretch-horizontal-20-filled"
            class="size-4"
            :color="canvas.data[index].propsValue.display === 'vertical'?'hsl(var(--primary))':''"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">

</style>