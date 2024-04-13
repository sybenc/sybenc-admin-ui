<script setup lang="ts">
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils.ts";

const props = defineProps({
  label: {type: String, required: true},
  horizontal: {type: Boolean}
})
const model = defineModel({type: String, required: true})
const {label, horizontal} = props
</script>

<template>
  <div :class="cn('w-full max-w-sm items-center gap-1.5 p-2',
  horizontal?'grid grid-cols-2 gap-4': 'grid')">
    <Label class="text-xs">{{ label }}</Label>
    <Input v-model="model" class="h-6 text-xs"/>
  </div>
</template>

<style scoped lang="css">

</style>