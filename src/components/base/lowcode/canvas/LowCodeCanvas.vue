<script setup lang="ts">
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";
import {ref, toRef} from "vue";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {Icon} from "@iconify/vue";
import LowCodeCanvasRuler from "@/components/base/lowcode/canvas/LowCodeCanvasRuler.vue";
import LowCodeCanvasComponentBlock from "@/components/base/lowcode/canvas/LowCodeCanvasComponentBlock.vue";
import {cloneDeep} from "lodash";
import {useLowCodeAdsorbStore} from "@/store/lowcode/adsorb.ts";
import LowCodeCanvasAdsorb from "@/components/base/lowcode/canvas/LowCodeCanvasAdsorb.vue";

const canvasStore = useLowCodeCanvasStore()
const {
  canvas,
  createCommandAddComponent,
  execute,
  getComponent,
  getComponentDefaultConfig,
  createCommandMoveComponent,
  paste,
  ruler
} = canvasStore
const adsorbStore = useLowCodeAdsorbStore()
const canvasCurrentSelected = toRef(canvasStore, 'currentSelectedComponent')
const oldCanvasCurrentSelected = toRef(canvasStore, 'oldSelectedComponent')
const lowCodeCanvas = ref<HTMLElement | null>(null)
const lowCodeCanvasContainer = ref<HTMLElement | null>(null)

const handleDrop = (e: any) => {
  const componentName = e.dataTransfer.getData('component')
  const groupName = e.dataTransfer.getData('group')
  const canvas = lowCodeCanvas.value
  if (componentName && groupName && canvas) {
    //深拷贝，防止所有组件引用一个component
    const component: CommonComponentConfig = cloneDeep(getComponentDefaultConfig(groupName, componentName))
    const canvasRect = canvas.getBoundingClientRect()
    component.style.left = `${(e.clientX - canvasRect.left).toFixed(0)}px`
    component.style.top = `${(e.clientY - canvasRect.top).toFixed(0)}px`
    oldCanvasCurrentSelected.value = component
    execute(createCommandAddComponent, component)
    canvasCurrentSelected.value = component
  }
}
const handleDragOver = (e: any) => {
  e.dataTransfer.dropEffect = 'copy'
}
const handleMouseDownComponentBlock = (e: any, component: CommonComponentConfig) => {
  //记录当前、上一个选中的组件信息
  oldCanvasCurrentSelected.value = canvasCurrentSelected.value
  canvasCurrentSelected.value = component
  //如果组件被锁定，直接结束
  if (component.lock) return
  //保存旧的位置信息，以便撤销、重做操作
  const oldComponent = cloneDeep(component)
  if (lowCodeCanvas.value) {
    const scale = canvasStore.getScale()
    //获取鼠标相对于画布的偏移量
    const startY = e.clientY
    const startX = e.clientX
    const positionX = parseFloat(component.style.left)
    const positionY = parseFloat(component.style.top)
    const onMouseMove = (moveEvent: MouseEvent) => {
      //设置组件正在移动
      canvasStore.currentComponentIsMoving = true
      if (component) {
        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        const moveOffsetX = (currX - startX) / scale + positionX
        const moveOffsetY = (currY - startY) / scale + positionY
        component.style.left = `${moveOffsetX.toFixed(2)}px`
        component.style.top = `${moveOffsetY.toFixed(2)}px`
        //寻找对齐线
        if (component.style.rotate === '0deg' || component.style.rotate === '-0deg') {
          adsorbStore.checkAlignmentLineCondition(component, currX - startX, currY - startY)
          adsorbStore.checkGuideLineCondition(component)
        }
      }
    }
    const onMouseUp = () => {
      //在鼠标抬起的时候记录操作，这时候传递的参数必须是深拷贝过的，否则无法正确执行撤销、重做操作
      //如果用户仅仅只是点击了组件，则不做操作
      const copyComponent = cloneDeep(component)
      if (!(oldComponent.style.left === component.style.left && oldComponent.style.top === component.style.top)) {
        execute(createCommandMoveComponent, copyComponent, oldComponent)
      }
      //设置组件停止移动
      canvasStore.currentComponentIsMoving = false
      //隐藏辅助线的显示
      adsorbStore.clearAlignmentLineStatus()
      adsorbStore.clearDistanceLinesStatus()
      adsorbStore.clearDistanceBlocksStatus()
      lowCodeCanvas.value?.removeEventListener('mousemove', onMouseMove)
      lowCodeCanvas.value?.removeEventListener('mouseup', onMouseUp)
    }
    lowCodeCanvas.value.addEventListener('mousemove', onMouseMove)
    lowCodeCanvas.value.addEventListener('mouseup', onMouseUp)
  }
}
</script>

<template>
  <div class="relative bg-gray-100 overflow-hidden">
    <div ref="lowCodeCanvasContainer" class="relative overflow-scroll">
      <ContextMenu>
        <ContextMenuTrigger>
          <LowCodeCanvasRuler :height="5000" :width="5000"/>
          <div ref="lowCodeCanvas"
               :style="`height: ${canvas.height};
                        width: ${canvas.width};
                        top: ${ruler.width}px;
                        left: ${ruler.width}px;`+canvasStore.getScaleStyle()"
               class="absolute bg-white"
               @click.left.prevent.stop="canvasCurrentSelected = null"
               @drop.prevent.stop="handleDrop($event)"
               @dragover.prevent="handleDragOver($event)">

            <!--            吸附组件-->
            <LowCodeCanvasAdsorb/>

            <!--            添加组件到画布-->
            <template v-for="(item, _) in canvas.data" :key="item.id">
              <LowCodeCanvasComponentBlock
                  :component="item"
                  @mousedown.left.stop.prevent="handleMouseDownComponentBlock($event, item)">
                <component
                    :is="getComponent(item.group, item.component)"
                    class="cursor-move"
                    :style="item.style"
                    :propsValue="item.propsValue"/>
              </LowCodeCanvasComponentBlock>
            </template>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem @click.stop.prevent="paste()">
            <Icon icon="fluent:clipboard-paste-24-regular" class="size-4 mr-2" color="hsl(var(--primary))"/>
            粘贴
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  </div>
</template>

<style scoped lang="css">
</style>