<script setup lang="ts">
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {generateLowCodeStyle} from "@/lib/utils.ts";
import {computed} from "vue";

const props = defineProps({
  style: Object as () => LowCodeInputStyle,
  propsValue: Object as () => LowCodeInputPropsValue
})

const {propsValue} = props
const style = computed(() => generateLowCodeStyle(props.style))
</script>

<template>
  <div class="flex items-center gap-1.5" :style="style">
    <template v-if="propsValue?.label!==undefined">
      <Label :for="propsValue?.id" class="flex w-1/12 justify-end mr-2">{{ propsValue?.label }}</Label>
    </template>
    <Input :id="propsValue?.id" :type="propsValue?.type" :placeholder="propsValue?.placeholder"/>
  </div>
</template>

<style scoped lang="css">

</style>