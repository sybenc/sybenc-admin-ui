<script setup lang="ts">
import {ResizableHandle, ResizablePanelGroup, ResizablePanel} from "@/components/ui/resizable";
import {Content, Navigation} from "@/components/base/layout";
</script>

<template>
  <div id="app" class="flex h-screen">
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
          class="flex-col pt-2 h-full side-bar box-border bg-gray-100 overflow-hidden"
          :default-size="16.7"
          :min-size="10"
          :max-size="16.7">
        <Navigation></Navigation>
      </ResizablePanel>
      <ResizableHandle/>
      <ResizablePanel class="flex-col flex-1 h-full box-border overflow-hidden" :default-size="83.3">
        <Content></Content>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>