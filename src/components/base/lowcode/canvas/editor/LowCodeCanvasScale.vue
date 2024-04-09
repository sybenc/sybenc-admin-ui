<template>
  <svg ref="scaleContainer"
       v-show="scaleShow"
       :width="width"
       :height="height"
       :viewBox="`0 0 ${width} ${height}`"
       class="absolute inset-0"></svg>
</template>

<script lang="ts" setup>
import {onMounted, ref, toRef} from 'vue';
import * as d3 from 'd3';
import {useLowCodeStore} from "@/store/lowcode";

const scaleContainer = ref<SVGSVGElement | null>(null);
const props = defineProps({
  width: {type: Number, required: true},
  height: {type: Number, required: true}
})
const store = useLowCodeStore()
const scaleShow = toRef(store, 'scaleShow')
const {width, height} = props
onMounted(() => {
  if (scaleContainer.value) {
    const svg = d3.select(scaleContainer.value)

    // 定义数据范围
    const dataX: number[] = []
    const dataY: number[] = []
    const smallDataX: number[] = []
    const smallDataY: number[] = []
    for (let i = 0; i <= width; i += 100) {
      dataX.push(i)
    }
    for (let i = 0; i <= height; i += 100) {
      dataY.push(i)
    }
    for (let i = 0; i <= width; i += 10) {
      smallDataX.push(i)
    }
    for (let i = 0; i <= height; i += 10) {
      smallDataY.push(i)
    }
    // 定义 X 比例尺
    const xScale = d3.scaleLinear()
        .domain([0, width])
        .range([0, width])

    // 定义 Y 比例尺
    const yScale = d3.scaleLinear()
        .domain([0, height])
        .range([0, height])

    // 绘制 X 比例尺
    svg.append("g")
        .attr("transform", "translate(16, 0)") // 向下偏移 16px
        .call(d3.axisTop(xScale)
            .tickSize(-10) // 将刻度线向上移动，即反方向
            .tickPadding(-12)
            .tickValues(dataX.filter((d: any) => d !== 0))
        )
        .call((g: any) => {
          g.select(".domain").remove()
        })// 设置数字与轴线的距离
        .selectAll(".tick text") // 选择所有刻度上的文本元素
        .attr("dx", "1.3em")
        .attr("dy", "0.1em")
        .style("font-size", '8px')

    svg.append("g")
        .attr("transform", "translate(16, 0)") // 向下偏移 16px
        .call(d3.axisTop(xScale)
            .tickSize(-5)
            .tickPadding(-12)
            .tickValues(smallDataX)
        )
        .call((g: any) => {
          g.selectAll(".tick text").remove(); // 移除所有刻度文本
          g.select(".domain").remove(); // 移除坐标轴线
        })


    // 绘制 Y 比例尺
    svg.append("g")
        .attr("transform", "translate(0, 16)") // 向下偏移 16px
        .call(d3.axisLeft(yScale)
            .tickSize(-10) // 将刻度线向右移动，即反方向
            .tickPadding(-10)
            .tickValues(dataY.filter((d: any) => d !== 0)))
        .call((g: any) => {
          g.select(".domain").remove()
        })
        .selectAll(".tick text") // 选择所有刻度上的文本元素
        .style("text-anchor", "start") // 设置文本锚点为末端
        .style("writing-mode", "tb")
        .style("font-size", '8px')
        .attr("dy", "0.5em")

    svg.append("g")
        .attr("transform", "translate(0, 16)") // 向下偏移 16px
        .call(d3.axisLeft(yScale)
            .tickSize(-5)
            .tickPadding(-10)
            .tickValues(smallDataY)
        )
        .call((g: any) => {
          g.selectAll(".tick text").remove(); // 移除所有刻度文本
          g.select(".domain").remove(); // 移除坐标轴线
        })

  }
})

</script>
