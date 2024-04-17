<script setup lang="ts">
import {useLowCodeAdsorbStore} from "@/store/lowcode/adsorb.ts";

const adsorbStore = useLowCodeAdsorbStore()
</script>

<template>
  <template v-for="(value, index) in adsorbStore.alignmentLinePair" :key="index">
    <div class="absolute bg-yellow-300" :style="`left: ${value.target.position};width: 1px;height: 5000px`"/>
  </template>
</template>

<style scoped lang="css">

</style>