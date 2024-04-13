<script setup lang="ts">
import {Input} from "@/components/ui/input"
import {Icon} from "@iconify/vue"
import {cn, separateNumberAndUnit} from "@/lib/utils.ts";
import {toast} from "@/components/ui/toast";

const props = defineProps({
  prefix: [Number, String],
  suffix: [Number, String],
  clickSelectAll: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false}
})
const {prefix, suffix, clickSelectAll, disabled} = props
const model = defineModel({type: String, required: true})

function isUnit(unit: string) {
  return ['px', 'em', 'rem', 'vh', 'vw', '%'].includes(unit)
}

const regex = /^\d+(\.\d+)?(px|em|vh|vw|%|rem)$/
const isEffective = regex.test(model.value)
const handleClickIncrement = () => {
  let [num, unit] = separateNumberAndUnit(model.value)
  if (!disabled && isEffective && num && unit && isUnit(unit)) model.value = `${++num}${unit}`
  else toast({title: "传入的 width 是无效值", description: "请检查传入数字、单位是否是有效值", variant: 'destructive',})
}
const handleClickDecrement = () => {
  let [num, unit] = separateNumberAndUnit(model.value)
  if (!disabled && isEffective && num && unit && isUnit(unit)) model.value = `${--num}${unit}`
  else toast({title: "传入的 height 是无效值", description: "请检查传入数字、单位是否是有效值", variant: 'destructive',})
}

function handleInputClick(e: any) {
  console.log(model.value)
  if (clickSelectAll) {
    const inputElement = e.target as HTMLInputElement;
    inputElement.select()
  }
}
</script>

<template>
  <div class="relative flex h-6 w-full rounded-md">
    <!--    前缀-->
    <div class="absolute left-0 grid grid-cols-1 h-full disabled:opacity-50" style="width: 20px;" v-if="prefix">
      <span class="flex text-xs justify-center" style="line-height: 24px;">{{ prefix }}</span>
    </div>
    <!--    输入部分-->
    <div class="w-full">
      <Input
          v-model="model" :default-value="0" class="h-full w-full text-xs"
          :class="cn(prefix
          ?suffix?'pl-5 pr-10':'px-5'
          :'pl-2 pr-5')"
          :disabled="disabled"
          @click="handleInputClick($event)"/>
    </div>

    <!--    后缀-->
    <div class="absolute right-0 grid grid-rows-2 h-full" :class="disabled? 'cursor-not-allowed': ''"
         style="right: 22px;" v-if="suffix">
      <span
          class="flex h-6 items-center justify-center box-border text-xs disabled:opacity-50"
          style="line-height: 24px">
       {{ suffix }}
      </span>
    </div>

    <!--    点击按钮-->
    <div class="absolute right-0 grid grid-rows-2 h-full" style="width: 20px;">
      <span @click.stop="handleClickIncrement"
            class="flex items-center justify-center rounded-tr-md box-border hover:bg-secondary cursor-pointer disabled:opacity-50"
            :class="disabled? 'cursor-not-allowed': ''">
       <Icon icon="fluent:triangle-12-filled" class="size-2" color="#9ca3af"/>
      </span>
      <span @click.stop="handleClickDecrement"
            class="flex items-center justify-center rounded-br-md box-border hover:bg-secondary cursor-pointer disabled:opacity-50"
            :class="disabled? 'cursor-not-allowed': ''">
       <Icon icon="fluent:triangle-down-12-filled" class="size-2" color="#9ca3af"/>
      </span>
    </div>
  </div>
</template>

<style scoped lang="css">

</style>