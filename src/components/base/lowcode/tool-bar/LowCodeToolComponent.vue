<script setup lang="ts">
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {useLowCodeStore} from "@/store/lowcode";
import {lowCodeToolBarConfig} from "@/components/lowcode/tool-bar";
import {computed} from "vue";

const store = useLowCodeStore()
const name = computed(() => store.currentSelectedComponent?.component)
const group = computed(() => store.currentSelectedComponent?.group)
</script>

<template>
  <div class="flex flex-col gap-2 overflow-y-auto">
    <Tabs default-value="属性" class="w-full">
      <TabsList class="grid grid-cols-3 rounded-none p-0 w-full">
        <TabsTrigger value="属性" class="rounded-none h-full text-xs data-[state=active]:shadow-none">属性</TabsTrigger>
        <TabsTrigger value="样式" class="rounded-none h-full text-xs data-[state=active]:shadow-none">样式</TabsTrigger>
        <TabsTrigger value="交互" class="rounded-none h-full text-xs data-[state=active]:shadow-none">交互</TabsTrigger>
      </TabsList>
      <TabsContent value="属性">
          <component :is="lowCodeToolBarConfig[group][name][`${name}Props`]"></component>
      </TabsContent>
      <TabsContent value="样式">
          <component :is="lowCodeToolBarConfig[group][name][`${name}Style`]"></component>
      </TabsContent>
      <TabsContent value="交互">
          <component :is="lowCodeToolBarConfig[group][name][`${name}Interaction`]"></component>
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped lang="css">

</style>