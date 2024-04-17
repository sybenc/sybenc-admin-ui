<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";
import {toRef} from "vue";
import {cloneDeep} from "lodash";

const store = useLowCodeCanvasStore()
const {
  canvas,
  createCommandChangeComponentStyle,
  execute,
} = store
const index = toRef(store, 'currentSelectedComponentIndex')
const current = canvas.data[index.value]

function getOffset(position: string): string {
  const canvasWidth = parseInt(canvas.width)
  const canvasHeight = parseInt(canvas.height)
  const componentWidth = parseInt(current.style.width)
  const componentHeight = parseInt(current.style.height)

  switch (position) {
    case 'HLeft':
      return '0px'
    case 'HCenter':
      return `${canvasWidth / 2 - componentWidth / 2}px`
    case 'HRight':
      return `${canvasWidth- componentWidth}px`
    case 'VTop':
      return '0px'
    case 'VCenter':
      return `${canvasHeight / 2 - componentHeight / 2}px`
    case 'VBottom':
      return `${canvasHeight - componentHeight}px`
    default:
      return ''
  }
}

function handleAlignHLeft() {
  const offset = getOffset('HLeft')
  if (current.style.left === offset) return
  const oldComponent = cloneDeep(current)
  current.style.left = offset
  const component = cloneDeep(current)
  execute(createCommandChangeComponentStyle, component, oldComponent)
}

function handleAlignHCenter() {
  const offset = getOffset('HCenter')
  if (current.style.left === offset) return
  const oldComponent = cloneDeep(current)
  current.style.left = offset
  const component = cloneDeep(current)
  execute(createCommandChangeComponentStyle, component, oldComponent)
}

function handleAlignHRight() {
  const offset = getOffset('HRight')
  if (current.style.left === offset) return
  const oldComponent = cloneDeep(current)
  current.style.left = offset
  const component = cloneDeep(current)
  execute(createCommandChangeComponentStyle, component, oldComponent)
}
function handleAlignVTop() {
  const offset = getOffset('VTop')
  if (current.style.top === offset) return
  const oldComponent = cloneDeep(current)
  current.style.top = offset
  const component = cloneDeep(current)
  execute(createCommandChangeComponentStyle, component, oldComponent)
}

function handleAlignVCenter() {
  const offset = getOffset('VCenter')
  if (current.style.top === offset) return
  const oldComponent = cloneDeep(current)
  current.style.top = offset
  const component = cloneDeep(current)
  execute(createCommandChangeComponentStyle, component, oldComponent)
}

function handleAlignVBottom() {
  const offset = getOffset('VBottom')
  if (current.style.top === offset) return
  const oldComponent = cloneDeep(current)
  current.style.top = offset
  const component = cloneDeep(current)
  execute(createCommandChangeComponentStyle, component, oldComponent)
}
</script>

<template>
  <div class="grid grid-cols-2 gap-4 px-2 pb-1">
    <div class="grid grid-cols-3 gap-1 items-center">
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary"
           @click.stop.prevent="handleAlignHLeft()">
        <Icon icon="fluent:align-left-28-filled" class="size-4"/>
      </div>
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary"
           @click.stop.prevent="handleAlignHCenter()">
        <Icon icon="fluent:align-center-vertical-28-filled" class="size-4 hover:bg-secondary"/>
      </div>
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary"
           @click.stop.prevent="handleAlignHRight()">
        <Icon icon="fluent:align-right-28-filled" class="size-4 hover:bg-secondary"/>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-1 items-center">
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary"
           @click.stop.prevent="handleAlignVTop()">
        <Icon icon="fluent:align-top-28-filled" class="size-4 hover:bg-secondary"/>
      </div>
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary"
           @click.stop.prevent="handleAlignVCenter()">
        <Icon icon="fluent:align-center-horizontal-28-filled" class="size-4 hover:bg-secondary"/>
      </div>
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary"
           @click.stop.prevent="handleAlignVBottom()">
        <Icon icon="fluent:align-bottom-28-filled" class="size-4 hover:bg-secondary"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">

</style>