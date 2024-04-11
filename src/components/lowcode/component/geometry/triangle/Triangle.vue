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
  <div :style="generateLowCodeStyle(style)">
    <svg>
      <polygon data-v-6aec75f7="" points="40 4,80 76,0 76" stroke="rgba(0, 0, 0, 1)" fill="rgba(255, 255, 255, 0)" stroke-width="1"></polygon>
    </svg>
  </div>
</template>

<style scoped lang="css">
</style>