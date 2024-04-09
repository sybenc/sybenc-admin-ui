<script setup lang="ts">
import {Icon} from "@iconify/vue";

interface NavItem {
  title: string,
  to: string,
  icon: string
}

const props = defineProps({
  data: {type: Array<NavItem>, required: true},
  title: {type: String},
})
const {data, title} = props
console.log(title)
</script>

<template>
  <nav class="w-full flex-col px-4 py-2">
    <template v-if="title">
      <div
          class="mb-1 tracking-tight text-gray-500 overflow-hidden"
          style="font-size: 12px;">
        {{ title }}
      </div>
    </template>
    <template v-for="(value, _) in data" :key="value.title">
      <div class="grid gap-1 space-y-1">
        <router-link
            class="inline-flex h-8 px-2 my-0.5 rounded-md hover:bg-gray-200"
            active-class="active"
            :to="value.to">
          <span
              class="w-full h-full inline-flex justify-start items-center align-middle whitespace-nowrap"
              style="font-size: 14px; line-height: 32px">
            <Icon :icon="value.icon" class="mx-1.5 size-4"/>
           {{ value.title }}
          </span>
        </router-link>
      </div>
    </template>
  </nav>
</template>

<style scoped lang="css">
.active.router-link-exact-active {
  background-color: hsl(var(--primary));
  color: white;
}
</style>