<script setup lang="ts">
import {useLowCodeStore} from "@/store/lowcode";
import {computed, toRef} from "vue";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion'
import StringInput from "@/components/lowcode/tool-bar/common/StringInput.vue";
import BooleanSwitch from "@/components/lowcode/tool-bar/common/BooleanSwitch.vue";
import ArraySelect from "@/components/lowcode/tool-bar/common/ArraySelect.vue";


const store = useLowCodeStore()
const {canvas} = store
const currentSelectedComponent = toRef(store, 'currentSelectedComponent')
const index = computed(() => canvas.data.findIndex((item) => item.id === currentSelectedComponent.value?.id))
const inputType = {'inputType': ['password', 'email', 'url', 'tel']}
</script>

<template>
  <string-input label="输入框ID" v-model="canvas.data[index].propsValue.id"/>
  <array-select label="输入框类型" :item="inputType" v-model="canvas.data[index].propsValue.type"/>
  <Accordion type="multiple" collapsible>
    <AccordionItem value="标签">
      <AccordionTrigger class="hover:no-underline h-8 p-2 text-xs">标签</AccordionTrigger>
      <AccordionContent>
        <boolean-switch label="显示" v-model="canvas.data[index].propsValue.labelShow"/>
        <string-input
            label="名称"
            v-model="canvas.data[index].propsValue.label"
            v-show="canvas.data[index].propsValue.labelShow"/>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="输入框">
      <AccordionTrigger class="hover:no-underline h-8 p-2 text-xs">输入框</AccordionTrigger>
      <AccordionContent>
        <boolean-switch label="提示显示" v-model="canvas.data[index].propsValue.placeholderShow"/>
        <string-input
            label="提示文本"
            v-model="canvas.data[index].propsValue.placeholder"
            v-show="canvas.data[index].propsValue.placeholderShow"/>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<style scoped lang="css">

</style>