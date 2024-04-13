<script setup lang="ts">
import {useLowCodeStore} from "@/store/lowcode";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {computed, toRef} from "vue";
import WidthHeight from "@/components/lowcode/tool-bar/common/WidthHeight.vue";
import TopLeft from "@/components/lowcode/tool-bar/common/TopLeft.vue";
import RangeSlider from "@/components/lowcode/tool-bar/common/RangeSlider.vue";
import StringInput from "@/components/lowcode/tool-bar/common/StringInput.vue";
import Align from "@/components/lowcode/tool-bar/common/Align.vue";
import Layout from "@/components/lowcode/tool-bar/common/Layout.vue";
const store = useLowCodeStore()
const {canvas} = store
const currentSelectedComponent = toRef(store, 'currentSelectedComponent')
const index = computed(() => canvas.data.findIndex((item) => item.id === currentSelectedComponent.value?.id))
</script>

<template>
  <align></align>
  <top-left class="px-2"/>
  <width-height class="px-2"/>
  <string-input label="旋转角度" v-model="canvas.data[index].style.opacity" horizontal/>
  <layout label="布局"></layout>
  <RangeSlider
      :min="0"
      :max="100"
      :step="1"
      :to-fixed="0"
      :unit="'px'"
      label="元素间隔"
      v-model="canvas.data[index].style.gap"/>
  <RangeSlider
      :min="0"
      :max="1"
      :step="0.01"
      :to-fixed="2"
      label="不透明度"
      v-model="canvas.data[index].style.opacity"/>
  <Accordion type="multiple" collapsible>
    <AccordionItem value="标签样式">
      <AccordionTrigger class="hover:no-underline h-8 p-2 text-xs">标签样式</AccordionTrigger>
      <AccordionContent>
        <div class="grid w-full max-w-sm items-center gap-1.5 p-2">
          <Label class="text-xs">输入框名称</Label>
          <Input v-model="canvas.data[index].propsValue.label" class="h-6 text-xs"/>
        </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="输入框样式">
      <AccordionTrigger class="hover:no-underline h-8 p-2 text-xs">输入框样式</AccordionTrigger>
      <AccordionContent>
        <div class="grid w-full max-w-sm items-center gap-1.5 p-2">
          <Label class="text-xs">输入提示</Label>
          <Input v-model="canvas.data[index].propsValue.placeholder" class="h-6 text-xs"/>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<style scoped lang="css">

</style>