<script setup lang="ts">
import {Icon} from "@iconify/vue";
</script>

<template>
  <div class="grid grid-cols-2 gap-4 px-2 pb-1">

    <div class="grid grid-cols-3 gap-1 items-center">
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary">
        <Icon icon="fluent:align-left-28-filled" class="size-4"/>
      </div>
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary">
        <Icon icon="fluent:align-center-vertical-28-filled" class="size-4 hover:bg-secondary"/>
      </div>
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary">
        <Icon icon="fluent:align-right-28-filled" class="size-4 hover:bg-secondary"/>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-1 items-center">
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary">
        <Icon icon="fluent:align-top-28-filled" class="size-4 hover:bg-secondary"/>
      </div>
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary">
        <Icon icon="fluent:align-bottom-28-filled" class="size-4 hover:bg-secondary"/>
      </div>
      <div class="flex items-center justify-center h-6 w-6 rounded hover:bg-secondary">
        <Icon icon="fluent:align-center-horizontal-28-filled" class="size-4 hover:bg-secondary"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">

</style>