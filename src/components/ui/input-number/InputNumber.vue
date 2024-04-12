<script setup lang="ts">
import {Input} from "@/components/ui/input"
import {Icon} from "@iconify/vue"
import {cn} from "@/lib/utils.ts";

const props = defineProps({
  prefix: [Number, String],
  suffix: [Number, String],
  clickSelectAll: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false}
})
const {prefix, suffix, clickSelectAll, disabled} = props
const model = defineModel({required: true, default: 0})
const handleClickIncrement = () => {
  if (!disabled) model.value++
}
const handleClickDecrement = () => {
  if (!disabled) model.value--
}

function handleInputClick(e: any) {
  if (clickSelectAll) {
    const inputElement = e.target as HTMLInputElement;
    inputElement.select()
  }
}
</script>

<template>
  <div class="relative flex h-6 w-full bg-secondary rounded-md">
    <div class="absolute left-0 grid grid-cols-1 h-full disabled:opacity-50" style="width: 20px;" v-if="prefix">
      <span class="flex text-xs justify-center" style="line-height: 24px;">{{ prefix }}</span>
    </div>
    <div class="w-full">
      <Input
          :model-value="model" :default-value="0" class="h-full w-full border-none text-xs"
          :class="cn(prefix
          ?suffix?'pl-5 pr-10':'px-5'
          :'pl-2 pr-5')"
          :disabled=disabled
          @click="handleInputClick($event)"/>
    </div>
    <div class="absolute right-0 grid grid-rows-2 h-full" :class="disabled? 'cursor-not-allowed': ''"
         style="right: 22px;">
      <span
          class="flex h-6 items-center justify-center box-border text-xs disabled:opacity-50"
          style="line-height: 24px">
       {{ suffix }}
      </span>
    </div>
    <div class="absolute right-0 grid grid-rows-2 h-full" style="width: 20px;">
      <span @click.stop="handleClickIncrement"
            class="flex items-center justify-center rounded-tr-md box-border hover:bg-gray-300 cursor-pointer disabled:opacity-50"
            :class="disabled? 'cursor-not-allowed': ''">
       <Icon icon="fluent:triangle-12-filled" class="size-2" color="#9ca3af"/>
      </span>
      <span @click.stop="handleClickDecrement"
            class="flex items-center justify-center rounded-br-md box-border hover:bg-gray-300 cursor-pointer disabled:opacity-50"
            :class="disabled? 'cursor-not-allowed': ''">
       <Icon icon="fluent:triangle-down-12-filled" class="size-2" color="#9ca3af"/>
      </span>
    </div>
  </div>
</template>

<style scoped lang="css">

</style>