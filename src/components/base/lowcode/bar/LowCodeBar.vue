<script setup lang="ts">
import {ContentTopBar} from "@/components/base/layout";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Icon} from "@iconify/vue";
import {lowCodeGroupMap} from "@/components/lowcode/widget";
import {useLowCodeStore} from "@/store/lowcode";
import {toRef} from "vue";

const store = useLowCodeStore()
const {setCurrentGroupName, setScaleShow} = store
const scaleShow = toRef(store, 'scaleShow')
const group: LowCodeGroupItem[] = []
for (const key in lowCodeGroupMap) {
  group.push(lowCodeGroupMap[key])
}
const handleClickMenu = (_:any, group: LowCodeGroupItem)=>{
  setCurrentGroupName(group.name)
}
</script>

<template>
  <ContentTopBar>
    <DropdownMenu>
      <DropdownMenuTrigger class="p-2">
        <Button variant="ghost" size="icon">
          <Icon icon="fluent:add-28-regular" class="size-5"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>添加组件</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <template v-for="(item, _) in group" :key="item.label">
          <DropdownMenuItem class="flex gap-2" @click.stop="handleClickMenu($event, item)">
            <span><Icon :icon="item.icon" class="size-4" color="hsl(var(--primary))"/></span>
            <span>{{ item.label }}</span>
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>
    <Button variant="ghost" size="icon" @click="setScaleShow()">
      <span><Icon icon="mynaui:ruler" class="size-5" :color="scaleShow?'hsl(var(--primary))':'black'"/></span>
    </Button>
    <Button variant="ghost" size="icon">
      <span><Icon icon="mynaui:align-left" class="size-5"/></span>
    </Button>
    <Button variant="ghost" size="icon">
      <span><Icon icon="mynaui:align-horizontal" class="size-5"/></span>
    </Button>
    <Button variant="ghost" size="icon">
      <span><Icon icon="mynaui:align-right" class="size-5"/></span>
    </Button>
  </ContentTopBar>
</template>

<style scoped lang="css">

</style>