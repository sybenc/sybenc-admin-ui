<script setup lang="ts">
import {Avatar, AvatarImage} from "@/components/ui/avatar";

const props = defineProps({
  src: {type: String, required: true},
  alt: {type: String, required: true},
})

const {src, alt} = props
console.log(src, alt)
</script>

<template>
  <div class="px-3">
    <router-link class="flex gap-2 w-full mb-4 items-center justify-start" to="/account/profile">
      <Avatar>
        <AvatarImage src="/src/assets/avatar.jpg"></AvatarImage>
      </Avatar>
      <span class="flex flex-col justify-start text-xs">
        <span style="font-size: 14px;">Yibo Sheng</span>
        <span class="text-gray-500">sybenc@icloud.com</span>
      </span>
    </router-link>
  </div>
</template>

<style scoped lang="css">

</style>