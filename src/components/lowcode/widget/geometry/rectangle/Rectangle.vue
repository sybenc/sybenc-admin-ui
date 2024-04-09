<script setup lang="ts">

import {generateLowCodeStyle} from "@/lib/utils.ts";

const props = defineProps({
  style: Object as () => LowCodeRectangleStyle,
  propsValue: Object as () => LowCodeRectanglePropsValue
})
const {style} = props
</script>

<template>
  <div :style="generateLowCodeStyle(style)" class="bg-gray-300"></div>
</template>

<style scoped lang="css">
</style>