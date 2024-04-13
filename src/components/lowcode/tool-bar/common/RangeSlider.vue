<script setup lang="ts">

import {Slider} from "@/components/ui/slider";
import {Label} from "@/components/ui/label";
import {ref, watch} from "vue";

const props = defineProps({
  label: {type: String, required: true},
  max: {type: Number, required: true},
  min: {type: Number, required: true},
  step: {type: Number, required: true},
  toFixed: {type: Number},
  unit: {type: String, default: ''}
})
const {min, max, label, step, toFixed, unit} = props
const model = defineModel({type: String, required: true})
const slider = ref<number[]>([parseFloat(model.value)])
watch(slider, () => {
  model.value = `${slider.value[0]}` + unit
})
</script>

<template>
  <div class="flex flex-col gap-1.5 px-2 py-1">
    <div class="flex justify-between">
      <Label class="justify-start text-xs">{{ label }}</Label>
      <Label class="justify-start text-xs">{{ (parseFloat(model)).toFixed(toFixed) + unit }}</Label>
    </div>
    <Slider
        v-model="slider"
        :max="max"
        :min="min"
        :step="step"/>
  </div>
</template>

<style scoped lang="css">

</style>