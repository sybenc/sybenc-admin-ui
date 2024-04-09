<script setup lang="ts">
import {generateLowCodeStyle} from "@/lib/utils.ts";
import {computed, toRef} from "vue";
import {useLowCodeStore} from "@/store/lowcode";
import {Icon} from "@iconify/vue";
import {ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem} from "@/components/ui/context-menu";

const store = useLowCodeStore()
const {deleteComponent, setTopComponent, setBottomComponent} = store
const props = defineProps({
  component: {type: Object as () => CommonComponentConfig, required: true},
})
const {component} = props

const isActive = computed(() => canvasCurrentSelected.value?.id === component?.id)
const canvasCurrentSelected = toRef(store, 'canvasCurrentSelected')
console.log(generateLowCodeStyle(component.style)+`z-index:${component.layer};`)
const selectComponent = (_: any) => {
}
</script>

<template>
  <div
      class="absolute cursor-move"
      :style="generateLowCodeStyle(component.style)+`z-index:${component.layer};`"
      :class="isActive?'shape':''"
      @click.stop.prevent="selectComponent($event)">
    <ContextMenu>
      <ContextMenuTrigger>
        <slot></slot>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem @click.stop.prevent="deleteComponent(component)">
          <Icon icon="fluent:delete-24-regular" class="size-4 mr-2" color="hsl(var(--primary))"/>
          删除
        </ContextMenuItem>
        <ContextMenuItem>
          <Icon icon="mynaui:copy" class="size-4 mr-2" color="hsl(var(--primary))"/>
          复制
        </ContextMenuItem>
        <ContextMenuItem>
          <Icon icon="fluent:clipboard-paste-24-regular" class="size-4 mr-2" color="hsl(var(--primary))"/>
          粘贴
        </ContextMenuItem>
        <ContextMenuItem>
          <Icon icon="fluent:lock-24-regular" class="size-4 mr-2" color="hsl(var(--primary))"/>
          锁定
        </ContextMenuItem>
        <ContextMenuItem @click.stop.prevent="setTopComponent(component)">
          <Icon icon="mynaui:chevron-up-square" class="size-4 mr-2" color="hsl(var(--primary))"/>
          置顶
        </ContextMenuItem>
        <ContextMenuItem @click.stop.prevent="setBottomComponent(component)">
          <Icon icon="mynaui:chevron-down-square" class="size-4 mr-2" color="hsl(var(--primary))"/>
          置底
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </div>
</template>

<style scoped lang="css">
.shape {
  outline: 2px solid hsl(var(--primary));
}
</style>