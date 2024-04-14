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
import {lowCodeGroupMap} from "@/components/lowcode/component"
import {useLowCodeStore} from "@/store/lowcode";
import {toRef} from "vue";

const store = useLowCodeStore()
const {setCurrentGroupName, undo, redo, ruler} = store
const historyOperationShow = toRef(store, 'historyOperationShow')
const group: LowCodeGroupItem[] = []
for (const key in lowCodeGroupMap) {
  group.push(lowCodeGroupMap[key])
}
const handleClickMenu = (_: any, group: LowCodeGroupItem) => {
  setCurrentGroupName(group.name)
}
const handleClickHistory = () => {
  historyOperationShow.value = !historyOperationShow.value
}
</script>

<template>
  <ContentTopBar>
    <template #left>
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
              <span><Icon :icon="item.icon" class="size-5" color="hsl(var(--primary))"/></span>
              <span>{{ item.label }}</span>
            </DropdownMenuItem>
          </template>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="ghost" size="icon" @click="ruler.show = !ruler.show">
        <Icon icon="mynaui:ruler" class="size-5" :color="ruler.show?'hsl(var(--primary))':'black'"/>
      </Button>
    </template>

    <template #right>
      <Button variant="ghost" size="icon" @click="handleClickHistory">
        <Icon icon="mynaui:save" class="size-5"/>
      </Button>
      <Button variant="ghost" size="icon" @click="undo()">
        <Icon icon="mynaui:corner-up-left" class="size-5"/>
      </Button>
      <Button variant="ghost" size="icon" @click="redo()">
        <Icon icon="mynaui:corner-up-right" class="size-5"/>
      </Button>
      <Button variant="ghost" size="icon" @click="handleClickHistory">
        <Icon icon="fluent:history-28-regular" class="size-5"/>
      </Button>

    </template>
  </ContentTopBar>
</template>

<style scoped lang="css">

</style>