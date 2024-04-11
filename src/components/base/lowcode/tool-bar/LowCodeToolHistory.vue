<script setup lang="ts">
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {useLowCodeStore} from "@/store/lowcode";
import {toRef} from "vue";
import {Icon} from "@iconify/vue";

const store = useLowCodeStore()
const {historyOperation, recoverByHistory} = store
const historyOperationIndex = toRef(store, 'historyOperationIndex')

</script>

<template>
  <div class="flex flex-col h-full gap-2 overflow-y-auto">
    <Tabs default-value="历史记录" class="relative w-full">
      <TabsList class="sticky inset-0 grid grid-cols-3 rounded-none p-0 w-full" style="z-index: 100;">
        <TabsTrigger value="历史记录" class="rounded-none h-full text-xs data-[state=active]:shadow-none">历史记录
        </TabsTrigger>
        <TabsTrigger value="本地草稿" class="rounded-none h-full text-xs data-[state=active]:shadow-none">本地草稿
        </TabsTrigger>
      </TabsList>
      <TabsContent value="历史记录" class="flex flex-col gap-1 px-2 w-full">
        <div
            v-for="(item, index) in historyOperation"
            :key="index"
            class="flex gap-1 px-3 w-full h-6 items-center justify-start rounded cursor-pointer"
            :class="historyOperationIndex === index? 'bg-primary text-white': 'hover:bg-secondary'"
            @click.prevent.stop="recoverByHistory(index)">
          <Icon :icon="item.command.description.icon" class="size-4" :color="historyOperationIndex === index?'white':'hsl(var(--primary))'"></Icon>
          <span style="font-size: 14px; line-height: 32px;">{{ item.command.description.label }}: </span>
          <span style="font-size: 14px; line-height: 32px;">{{ item.command.component.label }}</span>
        </div>
      </TabsContent>
      <TabsContent value="本地草稿">
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped lang="css">

</style>