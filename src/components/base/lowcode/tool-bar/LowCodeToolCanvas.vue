<script setup lang="ts">
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {useLowCodeStore} from "@/store/lowcode";
import RangeSlider from "@/components/lowcode/tool-bar/common/RangeSlider.vue";
import BooleanSwitch from "@/components/lowcode/tool-bar/common/BooleanSwitch.vue";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
const store = useLowCodeStore()
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
        <Accordion type="multiple" collapsible>
          <AccordionItem value="标尺">
            <AccordionTrigger class="hover:no-underline h-8 p-2 text-xs">标尺</AccordionTrigger>
            <AccordionContent>
              <boolean-switch label="显示标尺" v-model="store.ruler.show"/>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped lang="css">

</style>