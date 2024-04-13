<script setup lang="ts">
import {Switch} from "@/components/ui/switch";
import {Label} from '@/components/ui/label'
const props = defineProps({
  label: {type: String, required: true},
})
const model = defineModel({type: Boolean, required: true})
const {label} = props
</script>

<template>
  <div class="flex justify-between items-center px-2">
    <Label class="justify-start text-xs">{{label}}</Label>
    <Switch v-model:checked="model"/>
  </div>
</template>

<style scoped lang="css">

</style>