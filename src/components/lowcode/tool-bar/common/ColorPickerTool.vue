<script setup lang="ts">
import {Label} from "@/components/ui/label";

const props = defineProps({
  label: {type: String, required: true}
})
const {label} = props
const model = defineModel({type: String})
</script>

<template>
  <div class="flex justify-between items-center gap-1.5 px-2 py-1">
    <Label class="justify-start text-xs">{{ label }}</Label>
    <input class="justify-end w-9 h-4 outline-none border-none rounded" type="color" v-model="model">
  </div>
</template>

<style scoped lang="css">
input[type="color"] {
  -webkit-appearance: none;
  border: none;
  padding: 0;
  border-radius: 2px;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  margin: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 2px;
}
</style>