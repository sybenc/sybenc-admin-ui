<template>
  <div class="ruler-container" @scroll="handleScroll">
    <svg class="ruler-svg" :width="totalWidth" :height="height">
      <line v-for="(tick, index) in ticks" :key="index" :x1="tick" :y1="0" :x2="tick" :y2="tickLength" stroke="black" />
      <text v-for="(tick, index) in ticks" :key="index" :x="tick" :y="textY" text-anchor="middle" dominant-baseline="hanging">{{ tick / gridSize }}</text>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const width = 800; // 标尺总宽度
const height = 50; // 标尺高度
const gridSize = 10; // 每个刻度的间隔

const totalWidth = computed(() => width * gridSize); // 实际总宽度
const tickLength = 10; // 刻度线长度
const textY = 15; // 文字位置

// 生成刻度位置
const ticks = ref([]);
for (let i = 0; i <= totalWidth.value; i += gridSize) {
  ticks.value.push(i);
}

const handleScroll = (event) => {
  const scrollLeft = event.target.scrollLeft;
  // 更新刻度位置，使得滚动时标尺跟随滚动
  ticks.value = ticks.value.map((tick) => tick - scrollLeft);
};
</script>

<style>
.ruler-container {
  width: 100%;
  overflow-x: auto;
}

.ruler-svg {
  display: block;
}
</style>
