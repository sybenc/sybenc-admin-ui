<script setup>
import {reactive, ref} from "vue";

const colors = ref('hsl(346.8 77.2% 49.8%)')
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
</script>

<template>
  <Sketch
      v-model="colors" v-model:rgb="colorObj.rgb" v-model:rgba="colorObj.rgba" v-model:hsl="colorObj.hsl"
      v-model:hsla="colorObj.hsla" v-model:hex="colorObj.hex" v-model:hex8="colorObj.hex8"
      v-model:hsv="colorObj.hsv"
      v-model:hsva="colorObj.hsva"
  />
</template>