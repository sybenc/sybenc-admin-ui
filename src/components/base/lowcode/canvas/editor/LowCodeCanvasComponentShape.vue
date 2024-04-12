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
const selectComponent = (_: any) => {}
</script>

<template>
  <div
      class="absolute cursor-move"
      :style="generateLowCodeStyle(component.style)+`z-index:${component.layer};`"
      :class="isActive?'shape':''"
      @click.stop.prevent="selectComponent($event)">
    <Icon
        v-show="isActive&&component.lock"
        icon="fluent:lock-closed-28-regular" class="absolute inset-0 size-4 mr-2" color="hsl(var(--primary))"/>
    <ContextMenu>
      <ContextMenuTrigger>
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
  outline: 2px solid hsl(var(--primary));
}
</style>