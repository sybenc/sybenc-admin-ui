<script setup lang="ts">
import { Label } from '@/components/ui/label'
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {computed} from "vue";
import {generateLowCodeStyle} from "@/lib/utils.ts"

const props = defineProps({
  style: Object as () => LowCodeRadioStyle,
  propsValue: Object as () => LowCodeRadioPropsValue
})

const {propsValue} = props
const style = computed(() => generateLowCodeStyle(props.style))
</script>

<template>
  <RadioGroup :default-value="propsValue?.value[0]" :style="style">
    <template v-for="(item, index) in propsValue?.id" :key="item">
      <div class="flex items-center space-x-2">
        <RadioGroupItem :id="item" :value="propsValue?.value[index]" />
        <Label :for="item">{{propsValue?.label[index]}}</Label>
      </div>
    </template>
  </RadioGroup>
</template>

<style scoped lang="css">

</style>