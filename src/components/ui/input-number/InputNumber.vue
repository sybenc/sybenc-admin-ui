<script setup lang="ts">
import {Input} from "@/components/ui/input"
import {Icon} from "@iconify/vue"

const props = defineProps({
  prefix: [Number, String],
  unit: [Number, String],
  clickSelectAll: {type: Boolean, default: false},
})
const {prefix, unit, clickSelectAll} = props
const model = defineModel({required: true, default: 0})
const handleClickIncrement = () => {
  model.value++
}
const handleClickDecrement = () => {
  model.value--
}
function handleInputClick(e: any) {
  if(clickSelectAll) {
    const inputElement = e.target as HTMLInputElement;
    inputElement.select()
  }
}
</script>

<template>
  <div class="relative flex h-6 w-full bg-secondary rounded-md">
    <div class="absolute left-0 grid grid-cols-1 h-full" style="width: 20px;" v-if="prefix">
      <span class="flex text-xs justify-center" style="line-height: 24px;">{{prefix}}</span>
    </div>
    <div class="w-full">
      <Input
          :model-value="model" :default-value="0" class="h-full w-full border-none text-xs"
          :class="prefix
          ?unit?'pl-5 pr-10':'px-5'
          :'pl-2 pr-5'"
          @click="handleInputClick($event)"/>
    </div>
    <div class="absolute right-0 grid grid-rows-2 h-full" style="right: 22px;">
      <span class="flex h-6 items-center justify-center box-border text-xs" style="line-height: 24px">
       {{unit}}
      </span>
    </div>
    <div class="absolute right-0 grid grid-rows-2 h-full" style="width: 20px;">
      <span @click.stop="handleClickIncrement"
            class="flex items-center justify-center rounded-tr-md box-border hover:bg-gray-300 cursor-pointer">
       <Icon icon="fluent:triangle-12-filled" class="size-2" color="#9ca3af"/>
      </span>
      <span @click.stop="handleClickDecrement"
            class="flex items-center justify-center rounded-br-md box-border hover:bg-gray-300 cursor-pointer">
       <Icon icon="fluent:triangle-down-12-filled" class="size-2" color="#9ca3af"/>
      </span>
    </div>
  </div>
</template>

<style scoped lang="css">

</style>