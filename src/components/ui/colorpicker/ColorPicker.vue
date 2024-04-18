<script setup lang="ts">
import {reactive, ref} from "vue";

const colorObj = reactive({
  hex: '',
  hex8: '',
  rgb: {},
  rgba: {},
  hsl: {},
  hsla: {},
  hsv: {},
  hsva: {},
})
const isSketchShow = ref<boolean>(false)
const model = defineModel({type: String, default: `hsl(262.1 83.3% 57.8%)`})
const sketchContainer = ref<HTMLElement | null>(null)
const sketchPosition = ref<string>('')
const sketchWidth = 220
const sketchHeight = 306
function handleClick(e: any) {
  isSketchShow.value = !isSketchShow.value
  console.log(e.clientX, window.innerWidth)
  if (e.clientX + sketchWidth > window.innerWidth) {
    sketchPosition.value = `left:-${sketchWidth}px;top: 0;`
    if (e.clientY + sketchHeight > window.innerHeight){
      sketchPosition.value = `left:-${sketchWidth}px;bottom: 0;`
    }
  }
}
</script>

<template>
  <div class="relative">
    <div class="h-4 w-8 rounded"
         :style="`background-color: ${model.hex};`"
         @click="handleClick"/>
    <div ref="sketchContainer"
         v-show="isSketchShow"
         class="absolute"
         style="width: 220px;height: 306px;"
         :style="sketchPosition + `width${sketchWidth}px;height:${sketchHeight}px;`">
      <Sketch
          v-model="model"
          v-model:rgb="colorObj.rgb"
          v-model:rgba="colorObj.rgba"
          v-model:hsl="colorObj.hsl"
          v-model:hsla="colorObj.hsla"
          v-model:hex="colorObj.hex"
          v-model:hex8="colorObj.hex8"
          v-model:hsv="colorObj.hsv"
          v-model:hsva="colorObj.hsva"
      />
    </div>
  </div>
</template>