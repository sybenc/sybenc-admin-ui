<script setup lang="ts">
import {generateLowCodeStyle} from "@/lib/utils.ts";
import {computed, toRef} from "vue";
import {useLowCodeStore} from "@/store/lowcode";
import {Icon} from "@iconify/vue";
import {ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem} from "@/components/ui/context-menu";

const store = useLowCodeStore()
const {
  createCommandDeleteComponent,
  createCommandLockComponent,
  createCommandUnlockComponent,
  createCommandSetTopComponent,
  createCommandSetBottomComponent,
  execute,
  copy,
  paste,
} = store
const props = defineProps({
  component: {type: Object as () => CommonComponentConfig, required: true},
})
const {component} = props

const isActive = computed(() => canvasCurrentSelected.value?.id === component?.id)
const canvasCurrentSelected = toRef(store, 'currentSelectedComponent')
//这个函数被用来阻止Shape组件向父组件冒泡，从而出现意料之外的后果
const selectComponent = (_: any) => {
}

const pointsPositionName: string[] = ['tl', 't', 'tr', 'r', 'br', 'b', 'bl', 'l']
const offset = 2.5
const width = parseInt(canvasCurrentSelected.value?.style.width)
const height = parseInt(canvasCurrentSelected.value?.style.height)
const getPointsStyle = computed(() => {
  const result: string[] = []
  result.push(`cursor:nwse-resize;top:${-offset}px;left:${-offset}px;`)
  result.push(`cursor:ns-resize;top:${-offset}px;left:${width / 2 - offset}px;`)
  result.push(`cursor:nesw-resize;top:${-offset}px;left:${width - offset}px;`)
  result.push(`cursor:ew-resize;top:${height / 2 - offset}px;left:${width - offset}px;`)
  result.push(`cursor:nwse-resize;top:${height - offset}px;left:${width - offset}px;`)
  result.push(`cursor:ns-resize;top:${height - offset}px;left:${width / 2 - offset}px;`)
  result.push(`cursor:nesw-resize;top:${height - offset}px;left:${-offset}px;`)
  result.push(`cursor:ew-resize;top:${height / 2 - offset}px;left:${-offset}px;`)
  return result
})
const getRotateIconStyle = computed(()=>{
  return `cursor:grab;top:-${30}px;left:${width / 2 - offset - 7}px;`
})
</script>

<template>
  <div
      class="absolute grid grid-cols-1 cursor-move"
      :style="generateLowCodeStyle(component.style)+`z-index:${component.layer};`"
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
        <div :style="getRotateIconStyle" class="absolute z-10">
          <Icon
              v-if="isActive && !component.lock"
              icon="fluent:arrow-clockwise-20-filled"
              class="size-5"
              color="hsl(var(--primary))"/>
        </div>
        <template v-if="isActive && !component.lock">
          <template v-for="(item, index) in getPointsStyle" :key="index">
            <div :style="item" class="absolute pointer z-10"></div>
          </template>
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

.pointer {
  width: 5px;
  height: 5px;
  background-color: white;
  outline: 1px solid hsl(var(--primary));
}
</style>