<script setup lang="ts">
import { ref} from 'vue'
import {EditableText} from "@/components/ui/editable-text";
const model = ref('sss')
</script>

<template>
  <EditableText v-model="model"></EditableText>
</template>