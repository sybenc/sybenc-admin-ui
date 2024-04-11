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
import {
  Sheet,
  SheetClose,
  SheetContent, SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

const store = useLowCodeStore()
const {setCurrentGroupName, setScaleShow, undo, redo} = store
const scaleShow = toRef(store, 'scaleShow')
const group: LowCodeGroupItem[] = []
for (const key in lowCodeGroupMap) {
  group.push(lowCodeGroupMap[key])
}
const handleClickMenu = (_: any, group: LowCodeGroupItem) => {
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
            <span><Icon :icon="item.icon" class="size-5" color="hsl(var(--primary))"/></span>
            <span>{{ item.label }}</span>
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>
    <Button variant="ghost" size="icon" @click="setScaleShow()">
      <span><Icon icon="fluent:ruler-28-regular" class="size-5"
                  :color="scaleShow?'hsl(var(--primary))':'black'"/></span>
    </Button>
    <Button variant="ghost" size="icon" @click="undo()">
      <span><Icon icon="fluent:arrow-hook-up-left-28-regular" class="size-5"/></span>
    </Button>
    <Button variant="ghost" size="icon" @click="redo()">
      <span><Icon icon="fluent:arrow-hook-up-right-28-regular" class="size-5"/></span>
    </Button>
    <!--    历史记录Sheet-->
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="ghost" size="icon">
          <span><Icon icon="fluent:history-28-regular" class="size-5"/></span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>历史记录</SheetTitle>
        </SheetHeader>
        <SheetDescription>
        </SheetDescription>
        <SheetFooter>
          <SheetClose as-child>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </ContentTopBar>
</template>

<style scoped lang="css">

</style>