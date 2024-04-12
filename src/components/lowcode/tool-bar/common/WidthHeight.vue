<script setup lang="ts">
import {InputNumber} from "@/components/ui/input-number"
import {Icon} from "@iconify/vue"
import {ref} from "vue"
const props = defineProps({
  component: {type: Object as () => CommonComponentConfig},
  disabled: {type: Boolean, default: false}
})
const {component, disabled} = props
const isLinkWH = ref<boolean>(false)
const width = ref(parseInt(component?.style.width))
const height = ref(parseInt(component?.style.height))
function handleHInput(e: any) {
  if (isLinkWH.value) {
    height.value = e.target.value
    width.value = e.target.value
  }
}

function handleWInput(e: any) {
  if (isLinkWH.value) {
    width.value = e.target.value
    height.value = e.target.value
  }
}

function handleClick(){
  if(!disabled) isLinkWH.value = !isLinkWH.value
}
</script>

<template>
  <div class="relative grid grid-cols-2 gap-4">
    <InputNumber
        v-model="height"
        prefix="W"
        suffix="px"
        @input="handleWInput($event)"
        :disabled="disabled"/>
    <Icon :icon="`fluent:lock-${isLinkWH?'closed':'open'}-28-filled`"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-3.5"
          :class="disabled? 'cursor-not-allowed': ''"
          @click.stop="handleClick"
          :color="isLinkWH?'hsl(var(--primary))':'black'"/>
    <InputNumber
        v-model="width"
        prefix="H"
        suffix="px"
        :disabled="disabled"
        @input="handleHInput($event)"/>
  </div>
</template>

<style scoped lang="css">

</style>