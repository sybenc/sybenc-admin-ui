<template>
  <div ref="chart">

  </div>
</template>

<script lang="ts" setup>
import {onMounted, Ref, ref} from "vue";
import * as d3 from "d3";

const props = defineProps({
  data: {type: Array<ChartDataItem>, required: true},
  width: {type: Number, required: true},
  height: {type: Number, required: true},
  margin: {
    type: Object as () => ChartMargin,
    default: {top: 30, right: 30, bottom: 50, left: 50}
  },
  padding: {type: Number, default: 0.1,},
  ruler: {type: Boolean, default: false},
  color: {type: String, default: 'hsl(var(--primary))'},
  radius: {type: Number, default: 0},
  opacity: {type: Number, default: 1},
  xAxisHidden: {type: Boolean, default: false},
  yAxisHidden: {type: Boolean, default: false},
  xLabelHidden: {type: Boolean, default: false},
  yLabelHidden: {type: Boolean, default: false},
  labelHidden: {type: Boolean, default: false},
  labelSize: {type: Number, default: 12},
  labelColor: {type: String, default: 'hsl(var(--primary))'}
})

const {
  data,
  width,
  height,
  margin,
  padding,
  color,
  radius,
  opacity,
  xAxisHidden,
  yAxisHidden,
  xLabelHidden,
  yLabelHidden,
  labelSize,
  labelColor,
  labelHidden,
  ruler,
} = props
const chart: Ref<HTMLElement | null> = ref(null)
// 绘制svg
const svg = d3.create('svg')
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", `max-width: ${width}; height: ${height};`)

// 定义x轴， y轴及其比例尺
const xAxis = d3.scaleBand()
const yAxis = d3.scaleLinear()

xAxis.domain(d3.groupSort(data, (d: ChartDataItem) => -d.value, (d: ChartDataItem) => d.name))
    .range([margin?.left, width - margin?.right - 30])
    .padding(padding)
yAxis.domain([0, d3.max(data, (d: ChartDataItem) => d.value)])
    .range([height - margin?.bottom, margin?.top])

// 绑定数据，绘制矩形
svg.append("g")
    .selectAll()
    .data(data)
    .join("rect")
    .attr("x", (d: ChartDataItem) => xAxis(d.name))
    .attr("y", (d: ChartDataItem) => yAxis(d.value))
    .attr("rx", radius)
    .attr("ry", radius)
    .attr("height", (d: ChartDataItem) => yAxis(0) - yAxis(d.value))
    .attr("width", xAxis.bandwidth())
    .attr("fill", color)
    .attr("opacity", opacity)

if (!labelHidden) {
  //设置label
  svg.append("g")
      .selectAll("text")
      .data(data)
      .join("text")
      .text((d: ChartDataItem) => d.value)
      .attr("x", (d: ChartDataItem) => xAxis(d.name) + xAxis.bandwidth() / 2)
      .attr("y", (d: ChartDataItem) => yAxis(d.value) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", labelColor)
      .attr("font-size", labelSize)
}

// 绘制x轴
svg.append("g")
    .attr("transform", `translate(0,${height - margin?.bottom})`)
    .call(d3.axisBottom(xAxis).tickSizeOuter(0))
    .call((g: any) => {
      if (xAxisHidden) {
        g.select(".domain").remove()
      }
      if (xLabelHidden) {
        g.selectAll(".tick").remove()
      }
    })

// 绘制y轴
svg.append("g")
    .attr("transform", `translate(${margin?.left},0)`)
    .call(d3.axisLeft(yAxis).tickFormat((y: number) => (y * 100).toFixed()))
    .call((g: any) => {
      if (yAxisHidden) {
        g.select(".domain").remove()
      }
      if (yLabelHidden) {
        g.selectAll(".tick").remove()
      }
    })
if (ruler) {
  // 创建移动标尺
  const rule = svg.append("line")
      .attr("stroke", "#000")
      .attr("y1", margin?.top - 6)
      .attr("y2", height - margin?.bottom - 1)
      .attr("x1", 0.5)
      .attr("x2", 0.5)

  svg.on("mousemove touchmove", (event: any) => {
    const x = d3.pointer(event, svg.node())[0] + 0.5;
    rule.attr("x1", x).attr("x2", x);
  })
}

onMounted(() => {
  chart.value?.appendChild(svg.node())
})
</script>
