<template>
  <div v-on:dblclick="isEditing = true">
    <span v-if="!isEditing">{{ model }}</span>
    <input v-if="isEditing"
           v-model="model"
           @keyup.enter="isEditing = false"
           @blur="isEditing = false"
           ref="inputRef"/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, nextTick} from 'vue';

const model = defineModel({type: String})

const isEditing = ref(false)
const inputRef = ref(null)

watch(isEditing, (newVal) => {
  if (newVal) {
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
})
</script>

<style scoped>
input {
  display: inline;
  all: unset;
  color: hsl(var(--primary));
}
</style>
