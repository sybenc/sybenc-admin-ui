<script setup lang="ts">
import {InputNumber} from "@/components/ui/input-number"
import {Icon} from "@iconify/vue"
import {ref} from "vue"

const isLinkWH = ref<boolean>(false)
const valueH = ref(100)
const valueW = ref(100)

function handleHInput(e: any) {
  if (isLinkWH.value) {
    valueW.value = e.target.value
    valueH.value = e.target.value
  }
}

function handleWInput(e: any) {
  if (isLinkWH.value) {
    valueH.value = e.target.value
    valueW.value = e.target.value
  }
}
</script>

<template>
  <div class="flex flex-col w-full gap-2 p-2">
    <div class="grid grid-cols-2 gap-4">
      <InputNumber :model-value="100" prefix="X" unit="px" click-select-all/>
      <InputNumber :model-value="100" prefix="Y" unit="px" click-select-all/>
    </div>
    <div class="relative grid grid-cols-2 gap-4">
      <InputNumber
          v-model="valueW"
          prefix="W"
          unit="px"
          @input="handleWInput($event)"
          click-select-all/>
      <Icon :icon="`fluent:lock-${isLinkWH?'closed':'open'}-28-filled`"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-3.5"
            @click.stop="isLinkWH = !isLinkWH"
            :color="isLinkWH?'hsl(var(--primary))':'black'"/>
      <InputNumber
          v-model="valueH"
          prefix="H"
          unit="px"
          @input="handleHInput($event)"
          click-select-all/>
    </div>
  </div>
</template>

<style scoped lang="css">

</style>