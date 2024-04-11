<script setup lang="ts">

import {generateLowCodeStyle} from "@/lib/utils.ts";

const props = defineProps({
  style: Object as () => LowCodeCircleStyle,
  propsValue: Object as () => LowCodeCirclePropsValue
})
const {style} = props
console.log(generateLowCodeStyle(style))
</script>

<template>
  <div :style="generateLowCodeStyle(style)" class="bg-red-200"></div>
</template>

<style scoped lang="css">
</style>