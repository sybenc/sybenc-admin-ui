<script setup lang="ts">
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {computed, toRef} from "vue";
const store = useLowCodeCanvasStore()
const {canvas} = store
const currentSelectedComponent = toRef(store, 'currentSelectedComponent')
const index = computed(() => canvas.data.findIndex((item) => item.id === currentSelectedComponent.value?.id))
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="入场动画">
      <AccordionTrigger class="hover:no-underline h-8 p-2 text-xs">入场动画</AccordionTrigger>
      <AccordionContent>
        <div class="grid w-full max-w-sm items-center gap-1.5 p-2">
          <Label class="text-xs">ID</Label>
          <Input v-model="canvas.data[index].propsValue.id" class="h-6 text-xs"/>
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5 p-2">
          <Label class="text-xs">类型</Label>
          <Input v-model="canvas.data[index].propsValue.type" class="h-6 text-xs"/>
        </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="输入校验">
      <AccordionTrigger class="hover:no-underline h-8 p-2 text-xs">输入校验</AccordionTrigger>
      <AccordionContent>
        <div class="grid w-full max-w-sm items-center gap-1.5 p-2">
          <Label class="text-xs">输入框名称</Label>
          <Input v-model="canvas.data[index].propsValue.label" class="h-6 text-xs"/>
        </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="预设事件">
      <AccordionTrigger class="hover:no-underline h-8 p-2 text-xs">预设事件</AccordionTrigger>
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