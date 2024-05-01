<script setup lang="ts">
import {iconComponents, type IconName} from "@/components/ui/icon/index.ts";
import {cn} from "@/lib/utils.ts";

const props = defineProps({
  name: {type: String as () => IconName, required: true},
  class: {type: String}
})
const {name} = props
</script>

<template>
  <component :is="iconComponents[name]" :class="cn('text-primary', props.class)"/>
</template>

<style scoped lang="css">

</style>