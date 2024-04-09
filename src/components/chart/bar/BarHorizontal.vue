<script setup lang="ts">
import * as d3 from "d3";
import {onMounted, ref, Ref} from "vue";

const chart: Ref<HTMLElement | null> = ref(null)

interface DataItem {
  name: string,
  value: number
}

const data: DataItem[] = [
  {name: 'Shao-Kui', value: 6},
  {name: 'Wen-Yang', value: 6},
  {name: 'Cai Yun', value: 16},
  {name: 'Liang Yuan', value: 10},
  {name: 'Yuan-Chen', value: 6},
  {name: 'Rui-Long', value: 10},
  {name: 'Dong Xin', value: 12},
  {name: 'He Yu', value: 20},
  {name: 'Xiang-Li', value: 12},
  {name: 'Godness', value: 20},
  {name: 'Wei-Yu', value: 15},
  {name: 'Chen Zheng', value: 14},
  {name: 'Yu Peng', value: 15},
  {name: 'Li Jian', value: 18}
]

const mt: number = 60
const ml: number = 200
const mr: number = 30
const mb: number = 60
const width: number = 1200
const height: number = 600

const innerWidth: number = width - ml - mr
const innerHeight: number = height - mt - mb

const svg = d3.create('svg')
    .attr('height', height)
    .attr('width', width)

const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d: DataItem) => d.value)])
    .range([0, innerWidth])

const yScale = d3.scaleBand()
    .domain(data.map((d: DataItem) => d.name))
    .range([0, innerHeight])
    .padding(0.2)

const g = svg.append('g')
    .attr('transform', `translate(${ml}, ${mt})`)

const yAxis = d3.axisLeft(yScale)
g.append('g').call(yAxis.tickSizeOuter(0))

const xAxis = d3.axisBottom(xScale)
g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`)
    .call((g: any) => g.select(".domain").remove())


g.append('g')
    .attr('fill', 'steelblue')
    .selectAll()
    .data(data)
    .join('rect')
    .attr('x', (_: DataItem) => xScale(0))
    .attr('y', (d: DataItem) => yScale(d.name))
    .attr('height', yScale.bandwidth())
    .attr('width', (d: DataItem) => xScale(d.value))


onMounted(() => {
  chart.value?.appendChild(svg.node())
})
</script>

<template>
  <div ref="chart"></div>
</template>

<style scoped lang="css">
</style>