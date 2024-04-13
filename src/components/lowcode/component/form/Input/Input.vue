<script setup lang="ts">
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {cn, generateLowCodeStyle} from "@/lib/utils.ts";
import {computed} from "vue";

const props = defineProps({
  style: {type: Object as () => LowCodeInputStyle, required: true},
  propsValue: {type: Object as () => LowCodeInputPropsValue, required: true}
})

const {propsValue} = props
const style = computed(() => {
  const reg = /^\d{1,3}(\.\d+)?%$/
  if (reg.test(props.style?.width)) props.style.width = 'auto'
  if (reg.test(props.style?.height)) props.style.height = 'auto'
  return generateLowCodeStyle(props.style)
})
</script>

<template>
  <div
      :class="cn(propsValue.display==='horizontal'? 'flex items-center':'flex flex-col'
        ,'flex')"
      :style="style"
      style="transform: rotate(0deg)">
    <template v-if="propsValue?.labelShow">
      <Label
          :for="propsValue?.id"
          :class="cn( propsValue.display==='horizontal'?'w-2/12 justify-end':'w-full justify-start'
            ,'flex')">
        {{ propsValue?.label }}
      </Label>
    </template>
    <Input
        :id="propsValue?.id" :type="propsValue?.type"
        :placeholder="propsValue.placeholderShow?propsValue?.placeholder:''"/>
  </div>
</template>

<style scoped lang="css">

</style>