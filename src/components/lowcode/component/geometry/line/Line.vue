<script setup lang="ts">
import {generateLowCodeStyle} from "@/lib/utils.ts";

const props = defineProps({
  style: Object as () => LowCodeLineStyle,
  propsValue: Object as () => LowCodeLinePropsValue
})
const {style, propsValue} = props
</script>

<template>
  <div :style="generateLowCodeStyle(style)"></div>
</template>

<style scoped lang="css">
</style>