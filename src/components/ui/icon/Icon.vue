<script setup lang="ts">
import {iconComponents, type IconName} from "@/components/ui/icon/index.ts";

const props = defineProps({
  name: {type: String as () => IconName, required: true},
  color: {type: String, default: 'hsl(var(--primary))'},
})
const {name, color} = props
</script>

<template>
  <component :is="iconComponents[name]"
             :color="color"/>
</template>

<style scoped lang="css">

</style>