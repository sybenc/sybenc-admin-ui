<script setup lang="ts">
import type {Column} from '@tanstack/vue-table'
import {cn} from '@/lib/utils.ts'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import IconArrowSortDown from "@/components/ui/icon/system/arrow/IconArrowSortDown.vue";
import IconArrowSortUp from "@/components/ui/icon/system/arrow/IconArrowSortUp.vue";
import IconArrowSort from "@/components/ui/icon/system/arrow/IconArrowSort.vue";
import IconEyeOff from "@/components/ui/icon/system/eye/IconEyeOff.vue";


defineProps({
  column: Object as () => Column<any, any>,
  title: {type: String, required: true},
  // class: {type: String, default: ''}
})
</script>

<template>
  <div v-if="column?.getCanSort()" :class="cn('flex items-center space-x-2 justify-center', $attrs.class ?? '')">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
            variant="ghost"
            size="sm"
            class="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span class="font-medium">{{ title }}</span>
          <IconArrowSortDown v-if="column.getIsSorted() === 'desc'" class="w-4 h-4 ml-2"/>
          <IconArrowSortUp v-else-if=" column.getIsSorted() === 'asc'" class="w-4 h-4 ml-2"/>
          <IconArrowSort v-else class="w-4 h-4 ml-2"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <IconArrowSortUp class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <IconArrowSortDown class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
          Desc
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <IconEyeOff class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>