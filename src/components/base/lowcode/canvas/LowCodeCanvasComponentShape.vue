<script setup lang="ts">
import {deepCopy, generateLowCodeStyle} from "@/lib/utils.ts";
import {computed, ref, toRef} from "vue";
import {useLowCodeStore} from "@/store/lowcode";
import {Icon} from "@iconify/vue";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";

const store = useLowCodeStore()
const {
  createCommandDeleteComponent,
  createCommandLockComponent,
  createCommandUnlockComponent,
  createCommandSetTopComponent,
  createCommandSetBottomComponent,
  createCommandChangeComponentStyle,
  execute,
  copy,
  paste,
} = store
const props = defineProps({
  component: {type: Object as () => CommonComponentConfig, required: true},
})
const {component} = props

//这个函数被用来阻止Shape组件向父组件冒泡，从而出现意料之外的后果
const selectComponent = (_: any) => {
}
const currentSelectedComponent = toRef(store, 'currentSelectedComponent')
const isActive = computed(() => currentSelectedComponent.value?.id === component.id)
const positionList: string[] = ['tl', 't', 'tr', 'r', 'br', 'b', 'bl', 'l']
const offset = 3
const shapeContainer = ref<HTMLElement | null>(null)

// 根据点的位置获取对应的鼠标样式
function getCursorStyle(position: string) {
  switch (position) {
    case 'tl':
    case 'br':
      return 'nwse-resize'
    case 'tr':
    case 'bl':
      return 'nesw-resize'
    case 't':
    case 'b':
      return 'ns-resize'
    case 'l':
    case 'r':
      return 'ew-resize'
    default:
      return 'auto'
  }
}

function getPointStyle(position: string) {
  const width = parseInt(component?.style.width)
  const height = parseInt(component?.style.height)
  let newLeft = 0
  let newTop = 0

  switch (position) {
    case 'tl':
      newLeft = 0
      newTop = 0
      break
    case 'tr':
      newLeft = width
      newTop = 0
      break
    case 'bl':
      newLeft = 0
      newTop = height
      break
    case 'br':
      newLeft = width
      newTop = height
      break
    case 't':
      newLeft = width / 2
      newTop = 0
      break
    case 'b':
      newLeft = width / 2
      newTop = height
      break
    case 'l':
      newLeft = 0
      newTop = height / 2
      break
    case 'r':
      newLeft = width
      newTop = height / 2
      break
    default:
      break
  }

  return `left:${newLeft - offset}px;top:${newTop - offset}px;cursor:${getCursorStyle(position)};`
}

function getRotateStyle() {
  const width = parseInt(component?.style.width) / 2
  return `left:${width - offset - 7}px;top:-30px;cursor:grab;`
}

function handleMouseDownOnPoint(point: any, position: string) {
  const oldComponent = deepCopy(component)
  const width = parseInt(component.style.width)
  const height = parseInt(component.style.height)
  const top = parseInt(component.style.top)
  const left = parseInt(component.style.left)
  const startX = point.clientX
  const startY = point.clientY

  const onMouseMove = (moveEvent: any) => {
    const currentX = moveEvent.clientX
    const currentY = moveEvent.clientY
    const disX = currentX - startX
    const disY = currentY - startY
    const hasT = /t/.test(position)
    const hasB = /b/.test(position)
    const hasL = /l/.test(position)
    const hasR = /r/.test(position)
    const newHeight = height + (hasT ? -disY : hasB ? disY : 0)
    const newWidth = width + (hasL ? -disX : hasR ? disX : 0)
    component.style.height = `${newHeight > 0 ? newHeight : 0}px`
    component.style.width = `${newWidth > 0 ? newWidth : 0}px`
    component.style.left = `${left + (hasL ? disX : 0)}px`
    component.style.top = `${top + (hasT ? disY : 0)}px`
  }

  const onMouseUp = () => {
    const newComponent = deepCopy(component)
    if (newComponent && oldComponent) {
      execute(createCommandChangeComponentStyle, newComponent, oldComponent)
    }
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

function handleRotate(e: any) {
  const oldComponent = deepCopy(component)
  // 获取初始坐标和角度
  const startX = e.clientX
  const startY = e.clientY
  const startRotate = parseInt(component?.style.rotate)
  // 获取元素中心点位置
  const rect = shapeContainer.value?.getBoundingClientRect()
  if (!rect) return
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  // 旋转前的角度
  const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)
  const onMouseMove = (moveEvent: any) => {
    const curX = moveEvent.clientX
    const curY = moveEvent.clientY
    // 旋转后的角度
    const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
    component.style.rotate = (startRotate + rotateDegreeAfter - rotateDegreeBefore).toFixed(0) + 'deg'
  }
  const onMouseUp = () => {
    const newComponent = deepCopy(component)
    if (newComponent && oldComponent) {
      execute(createCommandChangeComponentStyle, newComponent, oldComponent)
    }
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
</script>

<template>
  <div
      ref="shapeContainer"
      class="absolute grid grid-cols-1 cursor-move"
      :style="generateLowCodeStyle(component.style)+`z-index:${component.layer};opacity:1;`"
      :class="isActive?'shape':''"
      @click.stop.prevent="selectComponent($event)">
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="absolute inset-0 m-1 z-10">
          <Icon
              v-show="isActive && component.lock"
              icon="fluent:lock-closed-28-regular"
              class="size-5"
              color="hsl(var(--primary))"/>
        </div>
        <div
            class="absolute z-10"
            :style="getRotateStyle()"
            v-if="isActive && !component.lock"
            @mousedown.stop.prevent="handleRotate($event)">
          <Icon
              icon="fluent:arrow-clockwise-20-filled"
              class="size-5"
              color="hsl(var(--primary))"/>
        </div>
        <template v-if="isActive && !component.lock">
          <div
              v-for="position in positionList"
              :key="position"
              class="point-shape"
              :style="getPointStyle(position)"
              @mousedown="handleMouseDownOnPoint($event, position)"/>
        </template>
        <slot></slot>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem v-show="!component.lock"
                         @click.stop.prevent="execute(createCommandDeleteComponent, component)">
          <Icon icon="fluent:delete-24-regular" class="size-4 mr-2" color="hsl(var(--primary))"/>
          删除
        </ContextMenuItem>
        <ContextMenuItem v-show="!component.lock" @click.stop.prevent="copy(component)">
          <Icon icon="mynaui:copy" class="size-4 mr-2" color="hsl(var(--primary))"/>
          复制
        </ContextMenuItem>
        <ContextMenuItem v-show="!component.lock" @click.stop.prevent="paste()">
          <Icon icon="fluent:clipboard-paste-24-regular" class="size-4 mr-2" color="hsl(var(--primary))"/>
          粘贴
        </ContextMenuItem>
        <ContextMenuItem v-show="!component.lock" @click.stop.prevent="execute(createCommandLockComponent, component)">
          <Icon icon="fluent:lock-closed-24-regular" class="size-4 mr-2" color="hsl(var(--primary))"/>
          锁定
        </ContextMenuItem>
        <ContextMenuItem v-show="component.lock" @click.stop.prevent="execute(createCommandUnlockComponent, component)">
          <Icon icon="fluent:lock-open-24-regular" class="size-4 mr-2" color="hsl(var(--primary))"/>
          解锁
        </ContextMenuItem>
        <ContextMenuItem v-show="!component.lock"
                         @click.stop.prevent="execute(createCommandSetTopComponent, component)">
          <Icon icon="mynaui:chevron-up-square" class="size-4 mr-2" color="hsl(var(--primary))"/>
          置顶
        </ContextMenuItem>
        <ContextMenuItem v-show="!component.lock"
                         @click.stop.prevent="execute(createCommandSetBottomComponent, component)">
          <Icon icon="mynaui:chevron-down-square" class="size-4 mr-2" color="hsl(var(--primary))"/>
          置底
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </div>
</template>

<style scoped lang="css">
.shape {
  outline: 1px solid hsl(var(--primary));
}

.point-shape {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: white;
  outline: 1px solid hsl(var(--primary));
  z-index: 1;
}
</style>