<script setup lang="ts">

import Triangle from "@/components/lowcode/widget/geometry/triangle/Triangle.vue";
import Line from "@/components/lowcode/widget/geometry/line/Line.vue";
</script>

<template>
<div>图床</div>
  <Triangle></Triangle>
  <svg width="250" height="250">
    <line x1="50" y1="50" x2="200" y2="200" stroke="black" stroke-width="2" />
  </svg>
</template>

<style scoped lang="css">

</style>