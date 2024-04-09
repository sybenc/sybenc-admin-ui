<script setup lang="ts">
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/vue";
</script>

<template>
  <div class="flex items-center top-bar">
    <div class="flex items-center w-5/6">
      <slot></slot>
    </div>
    <div class="flex flex-1 py-3 items-center justify-end h-12">
      <Button variant="ghost" size="icon">
        <Icon icon="mynaui:earth" class="size-5"/>
      </Button>
      <Button variant="ghost" size="icon">
        <Icon icon="mynaui:cog-two" class="size-5"/>
      </Button>
      <Button variant="ghost" size="icon">
        <Icon icon="mynaui:moon" class="size-5"/>
      </Button>
      <!--      <Button variant="ghost" size="icon">-->
      <!--        <Icon icon="mynaui:sun" class="size-5"/>-->
      <!--      </Button>-->
    </div>
    <Avatar class="size-7 mx-2">
      <router-link to="/account/profile">
        <AvatarImage src="/src/assets/avatar.jpg"></AvatarImage>
      </router-link>
    </Avatar>
  </div>
</template>

<style scoped lang="css">
.top-bar {
  border-bottom: 1px solid #E4E4E4;
  height: 50px;
}
</style>