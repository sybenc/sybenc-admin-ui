<script setup lang="ts">
import {useLowCodeStore} from "@/store/lowcode";
import {ref, toRef} from "vue";
import {deepCopy} from "@/lib/utils.ts";
import LowCodeCanvasComponentShape from "@/components/base/lowcode/canvas/editor/LowCodeCanvasComponentShape.vue";
import LowCodeCanvasScale from "@/components/base/lowcode/canvas/editor/LowCodeCanvasScale.vue";

const store = useLowCodeStore()
const {
  canvasData,
  addComponentOnCanvas,
  getComponent,
  getComponentDefaultConfig
} = store
const canvasCurrentSelected = toRef(store, 'canvasCurrentSelected')
const lowCodeCanvas = ref<HTMLElement | null>(null)

const handleDrop = (e: any) => {
  const componentName = e.dataTransfer.getData('component')
  const groupName = e.dataTransfer.getData('group')
  const canvas = lowCodeCanvas.value
  if (componentName && groupName && canvas) {
    //深拷贝，防止所有组件引用一个component
    const component: CommonComponentConfig = deepCopy(getComponentDefaultConfig(groupName, componentName))
    const canvasRect = canvas.getBoundingClientRect()
    component.style.left = `${e.clientX - canvasRect.left}px`
    component.style.top = `${e.clientY - canvasRect.top}px`
    addComponentOnCanvas(component)
  }
}
const handleDragOver = (e: any) => {
  e.dataTransfer.dropEffect = 'copy'
}
const handleDragStart = (e: any, index: number) => {
  e.dataTransfer.setData('index', index.toString());
}
const handleMouseDown = (e: any, component: CommonComponentConfig) => {
  const canvas = lowCodeCanvas.value
  canvasCurrentSelected.value = component
  if (canvas) {
    // 获取画布大小和视口信息
    const canvasRect = canvas.getBoundingClientRect()
    //获取鼠标在组件内部的偏移量
    const offsetX = e.clientX - parseInt(component.style.left)
    const offsetY = e.clientY - parseInt(component.style.top)
    const onMouseMove = (mouseEvent: MouseEvent) => {
      if (component) {
        let left = mouseEvent.clientX - offsetX
        let top = mouseEvent.clientY - offsetY
        // 获取组件的宽度和高度并转换为数值类型
        const componentWidth = parseInt(component.style.width)
        const componentHeight = parseInt(component.style.height)
        // 确保组件在画布边界内移动
        left = Math.max(0, Math.min(left, canvasRect.width - componentWidth))
        top = Math.max(0, Math.min(top, canvasRect.height - componentHeight))
        component.style.left = `${left}px`
        component.style.top = `${top}px`
      }
    }
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }
}
</script>

<template>
  <div class="relative bg-gray-100 overflow-scroll">
    <LowCodeCanvasScale :height="1200" :width="1200"/>
    <div
        ref="lowCodeCanvas"
        class="h-full relative bg-white overflow-scroll"
        @click.left.prevent.stop="canvasCurrentSelected = null"
        @drop.prevent.stop="handleDrop($event)"
        @dragover.prevent="handleDragOver($event)">

      <template v-for="(item, index) in canvasData" :key="item.id">
        <LowCodeCanvasComponentShape
            :component="item"
            @dragstart="handleDragStart($event, index)"
            @mousedown.left.stop="handleMouseDown($event, item)">
          <component
              :is="getComponent(item.group,item.component)"
              class="cursor-move"
              :style="item.style"
              :propsValue="item.propsValue"/>
        </LowCodeCanvasComponentShape>
      </template>
    </div>
  </div>
</template>

<style scoped lang="css">

</style>