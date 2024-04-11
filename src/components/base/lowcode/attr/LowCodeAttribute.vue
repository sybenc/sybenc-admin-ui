<script setup lang="ts">
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import InputStyle from "@/components/lowcode/attr/form/input/InputStyle.vue";

</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <Tabs default-value="属性" class="w-full">
      <TabsList class="grid grid-cols-3 rounded-none p-0 w-full">
        <TabsTrigger value="属性" class="rounded-none h-full text-xs data-[state=active]:shadow-none">属性</TabsTrigger>
        <TabsTrigger value="样式" class="rounded-none h-full text-xs data-[state=active]:shadow-none">样式</TabsTrigger>
        <TabsTrigger value="高级" class="rounded-none h-full text-xs data-[state=active]:shadow-none">高级</TabsTrigger>
      </TabsList>
      <TabsContent value="属性">
        属性
      </TabsContent>
      <TabsContent value="样式">
        <InputStyle></InputStyle>
      </TabsContent>
      <TabsContent value="高级">
        高级
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped lang="css">

</style>