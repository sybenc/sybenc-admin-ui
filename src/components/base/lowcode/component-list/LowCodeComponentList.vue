<script setup lang="ts">
import {useLowCodeStore} from "@/store/lowcode";
import {Icon} from "@iconify/vue";
import {ref, toRef, watch} from 'vue';

const store = useLowCodeStore()
const {getCurrentGroupDefaultConfigListByName} = store
const currentGroupName = toRef(store, 'currentGroupName')

function handleDragStart(e: any) {
  e.dataTransfer.setData('component', e.target.dataset.component)
  e.dataTransfer.setData('group', e.target.dataset.group)
}

const currentGroupDefaultConfigList = ref(getCurrentGroupDefaultConfigListByName(currentGroupName.value))

watch(currentGroupName, () => {
  // 更新组件列表
  currentGroupDefaultConfigList.value = getCurrentGroupDefaultConfigListByName(currentGroupName.value);
})

</script>

<template>
  <div @dragstart="handleDragStart($event)">
    <div
        v-for="(item, index) in currentGroupDefaultConfigList"
        :key="index"
        draggable="true"
        class="flex gap-1 px-3 w-full h-8 items-center justify-start rounded bg-gray-100 cursor-move "
        :data-component="index"
        :data-group="item.group">
      <Icon :icon="item.icon" class="size-4" color="hsl(var(--primary))"></Icon>
      <span style="font-size: 14px; line-height: 32px;">{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped lang="css">
</style>