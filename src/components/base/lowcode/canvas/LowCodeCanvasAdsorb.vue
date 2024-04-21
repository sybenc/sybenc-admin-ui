<script setup lang="ts">
import {DistanceLine, useLowCodeAdsorbStore} from "@/store/lowcode/adsorb.ts";
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";

const adsorbStore = useLowCodeAdsorbStore()
const {
  distanceLines,
  alignmentLines,
  distanceBlocks,
} = adsorbStore
const canvasStore = useLowCodeCanvasStore()
const lineType: AlignmentLineType[] = ['vl', 'vc', 'vr', 'ht', 'hc', 'hb']
const distanceLineType: DistanceLineType[] = ['lr', 'rl', 'tb', 'bt']

function getDistanceLineStyle(line: DistanceLine): {
  lineStyle: string,
  topLineStyle: string,
  dashedTopLineStyle: string,
  labelStyle: string
} {
  if (!canvasStore.currentSelectedComponent) return {
    lineStyle: '',
    topLineStyle: '',
    dashedTopLineStyle: '',
    labelStyle: ''
  }
  const curComponentStyle = canvasStore.currentSelectedComponent?.style
  const targetComponentStyle = line.targetComponent?.style
  const curTop = parseFloat(curComponentStyle.top)
  const curLeft = parseFloat(curComponentStyle.left)
  const curWidth = parseFloat(curComponentStyle.width)
  const curHeight = parseFloat(curComponentStyle.height)
  const targetTop = parseFloat(targetComponentStyle.top)
  const targetLeft = parseFloat(targetComponentStyle.left)
  const targetWidth = parseFloat(targetComponentStyle.width)
  const targetHeight = parseFloat(targetComponentStyle.height)
  if (line.type === 'lr') {
    const top = curTop + curHeight / 2
    const left = targetLeft + targetWidth
    let dashedTopLineStyle = ''

    if (targetTop > top) {
      dashedTopLineStyle = `width:1px;height:${targetTop - top}px;
                            top:${targetTop - top};left:1;border-left:1px dashed hsl(var(--primary));`
    } else if ((targetTop + targetHeight < top)) {
      dashedTopLineStyle = `width:1px;height:${top - (targetTop + targetHeight)}px;
                            top:-${top - (targetTop + targetHeight)}px;left:1;border-left:1px dashed hsl(var(--primary));`
    }

    return {
      lineStyle: `top:${top}px;left:${left}px;height:1px;width:${line.distance}px;z-index:10000;`,
      topLineStyle: `width:1px;height:16px;top:-8px;left:0;`,
      dashedTopLineStyle,
      labelStyle: 'background-color:#3b82f6;color:white;height:12px;left:50%;transform:translate(-50%, -120%);border-radius:4px;z-index:10000;'
    }
  } else if (line.type === 'rl') {
    const top = curTop + curHeight / 2
    const left = curLeft + curWidth
    let dashedTopLineStyle = ''

    if (targetTop > top) {
      dashedTopLineStyle = `width:1px;height:${targetTop - top}px;
                            right:0;border-right:1px dashed hsl(var(--primary));`
    } else if ((targetTop + targetHeight < top)) {
      dashedTopLineStyle = `width:1px;height:${top - (targetTop + targetHeight)}px;
                            top:-${top - (targetTop + targetHeight)}px;right:0;border-right:1px dashed hsl(var(--primary));`
    }
    return {
      lineStyle: `top:${top}px;left:${left}px;height:1px;width:${line.distance}px;z-index:10000;`,
      topLineStyle: `width:1px;height:16px;top:-8px;right:0;`,
      dashedTopLineStyle,
      labelStyle: 'background-color:#3b82f6;color:white;height:12px;left:50%;transform:translate(-50%, -120%);border-radius:4px;z-index:10000;'
    }
  } else if (line.type === 'bt') {
    const top = curTop + curHeight
    const left = curLeft + curWidth / 2
    let dashedTopLineStyle = ''

    if (targetLeft > left) {
      dashedTopLineStyle = `width:${targetLeft - left}px;height:1px;
                            bottom:0;border-bottom:1px dashed hsl(var(--primary));`
    } else if ((targetLeft + targetWidth < left)) {
      dashedTopLineStyle = `width:${left - (targetLeft + targetWidth)}px;height:1px;
                            bottom:0;left:-${left - (targetLeft + targetWidth)}px;border-bottom:1px dashed hsl(var(--primary));`
    }

    return {
      lineStyle: `top:${top}px;left:${left}px;height:${line.distance}px;width:1px;z-index:10000;`,
      topLineStyle: `width:16px;height:1px;bottom:0;left:-8px;`,
      dashedTopLineStyle,
      labelStyle: 'background-color:#3b82f6;color:white;height:12px;top:50%;transform:translate(-110%, -50%);border-radius:4px;z-index:10000;'
    }
  } else {
    const top = parseFloat(targetComponentStyle.top) + parseFloat(targetComponentStyle.height)
    const left = parseFloat(curComponentStyle.left) + parseFloat(curComponentStyle.width) / 2
    let dashedTopLineStyle = ''

    if (targetLeft > left) {
      dashedTopLineStyle = `width:${targetLeft - left}px;height:1px;
                            top:0;border-bottom:1px dashed hsl(var(--primary));`
    } else if ((targetLeft + targetWidth < left)) {
      dashedTopLineStyle = `width:${left - (targetLeft + targetWidth)}px;height:1px;
                            top:0;left:-${left - (targetLeft + targetWidth)}px;border-bottom:1px dashed hsl(var(--primary));`
    }
    return {
      lineStyle: `top:${top}px;left:${left}px;height:${line.distance}px;width:1px;z-index:10000;`,
      topLineStyle: `width:16px;height:1px;top:0;left:-8px;`,
      dashedTopLineStyle,
      labelStyle: 'background-color:#3b82f6;color:white;height:12px;top:50%;transform:translate(-110%, -50%);border-radius:4px;z-index:10000;'
    }
  }
}
</script>

<template>
  <!--  六条对齐线-->
  <template v-for="(value, index) in lineType" :key="index">
    <template v-if="index<3">
      <div v-if="alignmentLines[value].show"
           class="absolute bg-yellow-400"
           :style="`height:${canvasStore.canvas.height};
                            width:1px;
                            z-index:9999;
                            left: ${alignmentLines[value].left};`"/>
    </template>
    <template v-else>
      <div v-if="alignmentLines[value].show"
           class="absolute bg-yellow-400"
           :style="`height:1px;
                            z-index:9998;
                            width:${canvasStore.canvas.width};
                            top: ${alignmentLines[value].top};`"/>
    </template>
  </template>
  <!--  四条距离线-->
  <template v-for="value in distanceLineType" :key="value">
    <div v-if="distanceLines[value].show && distanceLines[value].distance!==0"
         class="absolute bg-blue-500"
         :style="getDistanceLineStyle(distanceLines[value]).lineStyle">
      <div class="absolute bg-blue-500" style="z-index: 10000"
           :style="getDistanceLineStyle(distanceLines[value]).topLineStyle"/>
      <div class="absolute" :style="getDistanceLineStyle(distanceLines[value]).dashedTopLineStyle"/>
      <div class="absolute flex items-center justify-center px-1"
           style="font-size: 8px;"
           :style="getDistanceLineStyle(distanceLines[value]).labelStyle">
        <span style="line-height:13px;">
          {{
            Number.isInteger(distanceLines[value].distance)
                ? distanceLines[value].distance.toFixed(0)
                : distanceLines[value].distance.toFixed(1)
          }}
        </span>
      </div>
    </div>
  </template>
  <!--  两个方向的间距块-->
  <template
      v-for="(value,index) in distanceBlocks.vertical.get(distanceLines.tb.show
                                                          ? distanceLines.tb.distance
                                                          : distanceLines.bt.distance)"
      :key="index">
    <!--    ts类型推断错误不用管，这里已经确定数组undefined-->
    <div v-if="distanceBlocks.vertical.get(distanceLines.tb.show
                                                          ? distanceLines.tb.distance
                                                          : distanceLines.bt.distance).length > 1"
         class="absolute bg-red-500/20"
         :style="`width:${value.width}px;
                  height:${value.height}px;
                  top:${value.top}px;
                  left:${value.left}px;`"/>
  </template>
  <template
      v-for="(value,index) in distanceBlocks.horizontal.get(distanceLines.lr.show
                                                            ? distanceLines.lr.distance
                                                            : distanceLines.rl.distance)"
      :key="index">
    <div v-if="distanceBlocks.horizontal.get(distanceLines.lr.show
                                                            ? distanceLines.lr.distance
                                                            : distanceLines.rl.distance).length > 1"
         class="absolute bg-red-500/20"
         :style="`width:${value.width}px;
                  height:${value.height}px;
                  top:${value.top}px;
                  left:${value.left}px;`"/>
  </template>
</template>

<style scoped lang="css">
</style>