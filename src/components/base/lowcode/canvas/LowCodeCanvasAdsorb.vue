<script setup lang="ts">
import {useLowCodeAdsorbStore} from "@/store/lowcode/adsorb.ts";
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";

const adsorbStore = useLowCodeAdsorbStore()
const canvasStore = useLowCodeCanvasStore()
const lineType: LineType[] = ['vl', 'vc', 'vr', 'ht', 'hc', 'hb']

</script>

<template>
  <!--  六条对齐线-->
  <template v-for="(value, index) in lineType" :key="index">
    <template v-if="index<3">
      <div v-if="adsorbStore.alignmentLines[value].show"
           class="absolute bg-yellow-400"
           :style="`height:${canvasStore.canvas.height};
                            width:1px;
                            z-index:9999;
                            left: ${adsorbStore.alignmentLines[value].left};`"/>
    </template>
    <template v-else>
      <div v-if="adsorbStore.alignmentLines[value].show"
           class="absolute bg-yellow-400"
           :style="`height:1px;
                            z-index:9999;
                            width:${canvasStore.canvas.width};
                            top: ${adsorbStore.alignmentLines[value].top};`"/>
    </template>
  </template>
  <!--  两条距离线-->
  <div class="absolute bg-yellow-400" :style="`top:${canvasStore.currentSelectedComponent?.style.top}`"></div>
</template>

<style scoped lang="css">

</style>