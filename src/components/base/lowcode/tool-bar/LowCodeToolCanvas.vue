<script setup lang="ts">
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";
import RangeSlider from "@/components/lowcode/tool-bar/common/RangeSlider.vue";
import BooleanSwitch from "@/components/lowcode/tool-bar/common/BooleanSwitch.vue";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import ColorPickerTool from "@/components/lowcode/tool-bar/common/ColorPickerTool.vue";
import {Separator} from "@/components/ui/separator";
import StringInput from "@/components/lowcode/tool-bar/common/StringInput.vue";
const store = useLowCodeCanvasStore()
const {canvas} = store
</script>

<template>
  <div class="flex flex-col gap-2 overflow-y-auto">
    <Tabs default-value="画布属性" class="w-full">
      <TabsList class="grid grid-cols-1 rounded-none p-0 w-full border-b">
        <TabsTrigger value="画布属性" class="rounded-none h-full text-xs data-[state=active]:shadow-none">画布属性</TabsTrigger>
      </TabsList>
      <TabsContent value="画布属性">
        <range-slider
            :step="1"
            :min="25"
            :max="200"
            :unit="'%'"
            label="缩放"
            v-model="store.ruler.scale"/>
        <separator class="my-2"/>
        <boolean-switch label="显示标尺" v-model="store.ruler.show"/>
        <color-picker-tool v-if="store.ruler.show" label="标尺背景色" v-model="store.ruler.moveBlockColor"/>
        <color-picker-tool v-if="store.ruler.show" label="刻度线填充色" v-model="store.ruler.moveBlockColor"/>
        <color-picker-tool v-if="store.ruler.show" label="移动块填充色" v-model="store.ruler.moveBlockColor"/>
        <separator class="my-2"/>
        <boolean-switch label="显示辅助线" v-model="store.ruler.show"/>
        <color-picker-tool v-if="store.ruler.show" label="参考线填充色" v-model="store.ruler.moveBlockColor"/>
        <color-picker-tool v-if="store.ruler.show" label="对齐线填充色" v-model="store.ruler.moveBlockColor"/>
        <color-picker-tool v-if="store.ruler.show" label="距离线填充色" v-model="store.ruler.moveBlockColor"/>
        <color-picker-tool v-if="store.ruler.show" label="距离块填充色" v-model="store.ruler.moveBlockColor"/>
        <separator class="my-2"/>
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped lang="css">

</style>