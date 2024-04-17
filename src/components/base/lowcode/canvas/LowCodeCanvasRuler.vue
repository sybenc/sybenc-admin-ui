<script lang="ts" setup>
import {onMounted, ref, toRef, watch} from 'vue';
import * as d3 from 'd3';
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";
import LowCodeCanvasGuideLine from "@/components/base/lowcode/canvas/LowCodeCanvasGuideLine.vue";
import {cn} from "@/lib/utils.ts";

const store = useLowCodeCanvasStore()
const {
  ruler,
  createGuideLine,
} = store
const scale = toRef(ruler, 'scale')
const show = toRef(ruler, 'show')
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

onMounted(() => {
  drawRuler(parseInt(scale.value))
  rulerTopContainer.value?.append(svgTop.node())
  rulerLeftContainer.value?.append(svgLeft.node())
})

function handleTopRulerMouseEnter(e: any) {
  if (rulerTopContainer.value) {
    const rulerTopRect = rulerTopContainer.value.getBoundingClientRect()
    let offsetX = e.clientX - rulerTopRect.left
    ruler.guideLineV[0].show = true
    ruler.guideLineV[0].position = offsetX
    const onMouseMove = (moveEvent: any) => {
      const moveOffsetX = moveEvent.clientX - rulerTopRect.left
      const diffX = moveOffsetX - offsetX
      ruler.guideLineV[0].position += diffX
      offsetX = moveOffsetX
    }
    const onMouseLeave = () => {
      ruler.guideLineV[0].show = false
      rulerTopContainer.value?.removeEventListener('mousemove', onMouseMove)
      rulerTopContainer.value?.removeEventListener('mouseleave', onMouseLeave)
    }
    rulerTopContainer.value.addEventListener('mousemove', onMouseMove)
    rulerTopContainer.value.addEventListener('mouseleave', onMouseLeave)
  }
}

function handleLeftRulerMouseEnter(e: any) {
  if (rulerLeftContainer.value) {
    const rulerLeftRect = rulerLeftContainer.value.getBoundingClientRect()
    let offsetY = e.clientY - rulerLeftRect.top
    ruler.guideLineH[0].show = true
    ruler.guideLineH[0].position = offsetY
    const onMouseMove = (moveEvent: any) => {
      const moveOffsetY = moveEvent.clientY - rulerLeftRect.top
      const diffY = moveOffsetY - offsetY
      ruler.guideLineH[0].position += diffY
      offsetY = moveOffsetY
    }
    const onMouseLeave = () => {
      ruler.guideLineH[0].show = false
      rulerLeftContainer.value?.removeEventListener('mousemove', onMouseMove)
      rulerLeftContainer.value?.removeEventListener('mouseleave', onMouseLeave)
    }
    rulerLeftContainer.value.addEventListener('mousemove', onMouseMove)
    rulerLeftContainer.value.addEventListener('mouseleave', onMouseLeave)
  }
}

function handleTopRulerClick(e: any) {
  if (rulerLeftContainer.value) {
    const rulerLeftRect = rulerLeftContainer.value.getBoundingClientRect()
    let offsetX = (e.clientX - rulerLeftRect.left - ruler.width) / store.getScale()
    console.log(offsetX)
    createGuideLine('vertical', offsetX + ruler.width)
  }
}

function handleLeftRulerClick(e: any) {
  if (rulerTopContainer.value) {
    const rulerTopRect = rulerTopContainer.value.getBoundingClientRect()
    let offsetY = (e.clientY - rulerTopRect.top - ruler.width) / store.getScale()
    createGuideLine('horizontal', offsetY)
  }
}

watch(scale, (value, oldValue) => {
  if (value === oldValue) return
  const newScale = parseInt(value)
  svgTop.selectAll('g').remove()
  svgLeft.selectAll('g').remove()
  drawRuler(newScale)
})
watch(show, (value) => {
  svgTop.selectAll('g').remove()
  svgLeft.selectAll('g').remove()
  if (value) {
    drawRuler(parseInt(scale.value))
  }

})
</script>

<template>
  <div class="sticky top-0 h-4 z-10 bg-secondary"
       :style="`width: ${width}px;height: ${ruler.width}px;`">
    <svg ref="rulerTopContainer"
         :width="width"
         :height="ruler.width"
         class="absolute inset-0"
         style="z-index: 10001;"
         @mouseenter="handleTopRulerMouseEnter($event)"
         @click="handleTopRulerClick($event)"/>
    <!--            添加垂直辅助线到画布-->
    <template v-for="(item, index) in ruler.guideLineV" :key="index">
      <LowCodeCanvasGuideLine show :orientation="item.orientation" :index="index"/>
    </template>
    <template v-if="store.currentComponentIsMoving">
      <div :style="`left:${(parseFloat(store.currentSelectedComponent?.style.left))*store.getScale() + 16}px;
                    width:${parseFloat(store.currentSelectedComponent?.style.width)*store.getScale()}px;
                    height: 16px;`"
           class="absolute bg-primary/25"/>
    </template>
  </div>
  <div class="sticky left-0 w-4 z-10 bg-secondary" :style="`width: ${ruler.width}px;height:${height}px;`">
    <svg ref="rulerLeftContainer"
         :width="ruler.width"
         :height="height"
         class="absolute inset-0"
         style="z-index: 10001;"
         @mouseenter="handleLeftRulerMouseEnter($event)"
         @click="handleLeftRulerClick($event)"/>
    <!--            添加水平辅助线到画布-->
    <template v-for="(item, index) in ruler.guideLineH" :key="index">
      <LowCodeCanvasGuideLine show :orientation="item.orientation" :index="index"/>
    </template>
    <template v-if="store.currentComponentIsMoving">
      <div :style="`top:${parseFloat(store.currentSelectedComponent?.style.top)*store.getScale()}px;
                    height:${parseFloat(store.currentSelectedComponent?.style.height)*store.getScale()}px;
                    width: 16px;`"
           class="absolute bg-primary/25"/>
    </template>
  </div>
</template>
