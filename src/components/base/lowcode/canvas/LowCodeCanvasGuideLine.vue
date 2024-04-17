<script setup lang="ts">
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";
import {computed, ref} from "vue";
import {Icon} from "@iconify/vue";
import {cn} from "@/lib/utils.ts";

type LowCodeGuideLineType = 'solid' | 'dashed' | 'dotted' | 'double'
const props = defineProps({
  orientation: {type: String as () => Orientation, required: true},
  type: {type: String as () => LowCodeGuideLineType, default: 'dashed'},
  show: {type: Boolean},
  index: {type: Number, required: true}
})
const {orientation, show, type, index} = props
const store = useLowCodeCanvasStore()
const {ruler} = store
const lineContainer = ref<HTMLElement | null>(null)

function getLineStyle(): string {
  let result: string = ''
  const scale = store.getScale()
  if (orientation === 'vertical') {
    const guideLine = ruler.guideLineV[index]
    result += `left:${index === 0 ? guideLine.position : (guideLine.position - ruler.width) * scale + 16}px;
                  top:0;
                  width: 5px;
                  height:${store.canvas.height};
                  border-left:1px ${type} hsl(var(--primary));
                  z-index: 10000;
                  cursor: ${index === 0 ? 'inherit' : 'col-resize'}`
  } else {
    const guideLine = ruler.guideLineH[index]
    result += `left:0;
                  top:${index === 0 ? guideLine.position : guideLine.position * scale}px;
                  width:${store.canvas.width};
                  height: 5px;
                  border-top:1px ${type} hsl(var(--primary));
                  z-index: 10000;
                  cursor: ${index === 0 ? 'inherit' : 'row-resize'}`
  }
  return result
}

function handleMouseDown(e: any) {
  if (lineContainer.value) {
    const lineRect = lineContainer.value.getBoundingClientRect()
    let offsetX = e.clientX - lineRect.left
    let offsetY = e.clientY - lineRect.top
    const onMouseMove = (moveEvent: any) => {
      const moveOffsetX = moveEvent.clientX - lineRect.left
      const moveOffsetY = moveEvent.clientY - lineRect.top
      if (orientation === 'vertical') {
        const diffX = moveOffsetX - offsetX
        ruler.guideLineV[index].position += diffX / store.getScale()
      } else {
        const diffY = moveOffsetY - offsetY
        ruler.guideLineH[index].position += diffY / store.getScale()
      }
      offsetX = moveOffsetX
      offsetY = moveOffsetY
    }
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
}

const deleteIconShow = ref<boolean>(false)
const labelValue = computed(() => {
  let result: number = orientation === 'vertical'
      ? ruler.guideLineV[index].position - ruler.width
      : ruler.guideLineH[index].position
  if (index === 0) {
    result /= store.getScale()
  }
  return result
})
</script>

<template>
  <div
      ref="lineContainer"
      class="absolute"
      v-if="show&&(orientation==='vertical'?ruler.guideLineV[index].show:ruler.guideLineH[index].show)"
      :style="getLineStyle()"
      @mousedown.stop.prevent="handleMouseDown($event)"
      @mouseenter.stop.prevent="deleteIconShow = true"
      @mouseleave.stop.prevent="deleteIconShow = false">
    <div :class="cn('absolute gap-1 items-center justify-center'
    ,orientation==='vertical'?'top-4 left-0 px-2 flex flex-col':'top-0 left-4 py-2 flex')">
      <span class="text-primary"
            style="font-size: 10px;"
            :style="`writing-mode: ${orientation==='vertical'?'':'vertical-rl'};`">
      {{ labelValue.toFixed(0) }}
    </span>
      <Icon v-if="deleteIconShow&&index"
            icon="fluent:delete-28-filled"
            class="text-primary size-3.5"
            @click="store.deleteGuideLine(orientation, index)"/>
    </div>
  </div>
</template>

<style scoped lang="css">

</style>