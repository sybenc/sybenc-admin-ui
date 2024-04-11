<script setup lang="ts">
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
</script>

<template>
  <div class="flex flex-col gap-2 overflow-y-auto">
    <Tabs default-value="画布属性" class="w-full">
      <TabsList class="grid grid-cols-3 rounded-none p-0 w-full">
        <TabsTrigger value="画布属性" class="rounded-none h-full text-xs data-[state=active]:shadow-none">画布属性</TabsTrigger>
        <TabsTrigger value="画布类型" class="rounded-none h-full text-xs data-[state=active]:shadow-none">画布类型</TabsTrigger>
      </TabsList>
      <TabsContent value="画布属性">
        属性
      </TabsContent>
      <TabsContent value="画布类型">
        类型
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped lang="css">

</style>