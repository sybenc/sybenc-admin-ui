<script setup lang="ts">
import {useLowCodeStore} from "@/store/lowcode";
import {ref, toRef} from "vue";
import LowCodeCanvasComponentShape from "@/components/base/lowcode/canvas/editor/LowCodeCanvasComponentShape.vue";
import LowCodeCanvasScale from "@/components/base/lowcode/canvas/editor/LowCodeCanvasScale.vue";
import {deepCopy} from "@/lib/utils.ts";

const store = useLowCodeStore()
const {
  canvas,
  createCommandAddComponent,
  execute,
  getComponent,
  getComponentDefaultConfig,
    createCommandMoveComponent,
} = store
const canvasCurrentSelected = toRef(store, 'canvasCurrentSelected')
const oldCanvasCurrentSelected = toRef(store, 'oldCanvasCurrentSelected')
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
    oldCanvasCurrentSelected.value = component
    execute(createCommandAddComponent, component)
    canvasCurrentSelected.value = component
  }
}
const handleDragOver = (e: any) => {
  e.dataTransfer.dropEffect = 'copy'
}
const handleMouseDown = (e: any, component: CommonComponentConfig) => {
  //记录当前、上一个选中的组件信息
  oldCanvasCurrentSelected.value = canvasCurrentSelected.value
  canvasCurrentSelected.value = component
  //如果组件被锁定，直接结束
  if (component.lock) return
  //保存旧的位置信息，以便撤销、重做操作
  const oldComponent = deepCopy(component)
  const canvas = lowCodeCanvas.value
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
      //在鼠标抬起的时候记录操作，这时候传递的参数必须是深拷贝过的，否则无法正确执行撤销、重做操作
      //如果用户仅仅只是点击了组件，则不做操作
      const copyComponent = deepCopy(component)
      if (!(oldComponent.style.left === component.style.left && oldComponent.style.top === component.style.top)){
        execute(createCommandMoveComponent, copyComponent, oldComponent)
      }
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseup', onMouseUp)
    }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)
  }
}
</script>

<template>
  <div class="relative bg-gray-100 overflow-scroll">
    <LowCodeCanvasScale :height="parseInt(canvas.height)" :width="parseInt(canvas.width)"/>
    <div
        ref="lowCodeCanvas"
        :style="`height: ${canvas.height};width: ${canvas.width};`"
        class="relative bg-white overflow-scroll"
        @click.left.prevent.stop="canvasCurrentSelected = null"
        @drop.prevent.stop="handleDrop($event)"
        @dragover.prevent="handleDragOver($event)">
      <template v-for="(item, _) in canvas.data" :key="item.id">
        <LowCodeCanvasComponentShape
            :component="item"
            @mousedown.left.stop="handleMouseDown($event, item)">
          <component
              :is="getComponent(item.group, item.component)"
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