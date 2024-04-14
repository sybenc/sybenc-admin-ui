<template>
  <div class="sticky top-0 h-4 z-10 bg-secondary" :style="`width: ${width};height:16px;`">
    <svg ref="rulerTopContainer"
         :width="width"
         :height="16"/>
  </div>
  <div class="sticky left-0 w-4 z-10 bg-secondary" :style="`width: 16px;height:${height};`">
    <svg ref="rulerLeftContainer"
         :width="16"
         :height="height"/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, toRef, watch} from 'vue';
import * as d3 from 'd3';
import {useLowCodeStore} from "@/store/lowcode";

const store = useLowCodeStore()
const {ruler} = store
const scale = toRef(ruler, 'scale')
const rulerTopContainer = ref<SVGSVGElement | null>(null);
const rulerLeftContainer = ref<SVGSVGElement | null>(null);

const props = defineProps({
  width: {type: Number, required: true},
  height: {type: Number, required: true},
})
const {width, height} = props
const svgTop = d3.create('svg')
const svgLeft = d3.create('svg')

function getMarkData(max: number, gap: number): number[] {
  const result: number[] = []
  for (let i = 0; i <= max; i += gap) {
    result.push(i)
  }
  return result
}

function drawTopRuler(svg: any, max: number, data: number[], tickSize: number, textShow: boolean) {
  const scale = store.getScale()
  // 定义X比例尺
  const xScale = d3.scaleLinear()
      .domain([0, max])
      .range([0, max * scale])
  // 绘制 X 比例尺
  svg.append("g")
      .attr("transform", "translate(17, 0)")
      .call(d3.axisTop(xScale)
          .tickSize(tickSize) // 将刻度线向上移动，即反方向
          .tickPadding(-12)
          .tickValues(data)
      )
      .call((g: any) => {
        g.select(".domain").remove()
        g.select('.tick text').remove()
        if (!textShow) {
          g.selectAll('.tick text').remove()
        }
      })// 设置数字与轴线的距离
      .selectAll(".tick text") // 选择所有刻度上的文本元素
      .attr("dx", "1.3em")
      .attr("dy", "0.1em")
      .style("font-size", '8px')
}

function drawLeftRuler(svg: any, max: number, data: number[], tickSize: number, textShow: boolean) {
  const scale = store.getScale()
  // 定义 Y 比例尺
  const yScale = d3.scaleLinear()
      .domain([0, max])
      .range([0, max * scale])
  // 绘制 Y 比例尺
  svg.append("g")
      .attr("transform", "translate(0, 1)")
      .call(d3.axisLeft(yScale)
          .tickSize(tickSize) // 将刻度线向右移动，即反方向
          .tickPadding(-10)
          .tickValues(data)
      )
      .call((g: any) => {
        g.select(".domain").remove()
        g.select('.tick text').remove()
        if (!textShow) {
          g.selectAll('.tick text').remove()
        }
      })
      .selectAll(".tick text") // 选择所有刻度上的文本元素
      .style("text-anchor", "start") // 设置文本锚点为末端
      .style("writing-mode", "tb")
      .style("font-size", '8px')
      .attr("dy", "0.5em")
}

function drawRuler(scale: number) {
  svgTop.selectAll('g').remove()
  svgLeft.selectAll('g').remove()
  if (scale <= 200 && scale >= 120) {
    drawTopRuler(svgTop, width, getMarkData(width, 50), -10, true)
    drawTopRuler(svgTop, width, getMarkData(width, 10), -5, false)
    drawLeftRuler(svgLeft, width, getMarkData(height, 50), -10, true)
    drawLeftRuler(svgLeft, width, getMarkData(height, 10), -5, false)
  } else if (scale < 120 && scale >= 80) {
    drawTopRuler(svgTop, width, getMarkData(width, 100), -10, true)
    drawTopRuler(svgTop, width, getMarkData(width, 10), -5, false)
    drawLeftRuler(svgLeft, width, getMarkData(height, 100), -10, true)
    drawLeftRuler(svgLeft, width, getMarkData(height, 10), -5, false)
  } else if (scale < 80 && scale >= 60) {
    drawTopRuler(svgTop, width, getMarkData(width, 100), -10, true)
    drawTopRuler(svgTop, width, getMarkData(width, 20), -5, false)
    drawLeftRuler(svgLeft, width, getMarkData(height, 100), -10, true)
    drawLeftRuler(svgLeft, width, getMarkData(height, 20), -5, false)
  } else if (scale < 60 && scale >= 40) {
    drawTopRuler(svgTop, width, getMarkData(width, 200), -10, true)
    drawTopRuler(svgTop, width, getMarkData(width, 20), -5, false)
    drawLeftRuler(svgLeft, width, getMarkData(height, 200), -10, true)
    drawLeftRuler(svgLeft, width, getMarkData(height, 20), -5, false)
  } else if (scale < 40) {
    drawTopRuler(svgTop, width, getMarkData(width, 400), -10, true)
    drawTopRuler(svgTop, width, getMarkData(width, 40), -5, false)
    drawLeftRuler(svgLeft, width, getMarkData(height, 200), -10, true)
    drawLeftRuler(svgLeft, width, getMarkData(height, 40), -5, false)
  }
}
watch(scale, (value, oldValue) => {
  if (value === oldValue) return
  const newScale = parseInt(value)
  svgTop.selectAll('g').remove()
  svgLeft.selectAll('g').remove()
  drawRuler(newScale)
})
onMounted(() => {
  drawRuler(parseInt(scale.value))
  rulerTopContainer.value?.append(svgTop.node())
  rulerLeftContainer.value?.append(svgLeft.node())
})

</script>
