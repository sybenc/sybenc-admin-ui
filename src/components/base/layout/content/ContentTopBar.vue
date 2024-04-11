<script setup lang="ts">
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/vue";
import {Separator} from "@/components/ui/separator";
</script>

<template>
  <div class="flex items-center justify-between top-bar">
    <div class="flex items-center">
      <slot name="left" class="flex justify-start"></slot>
    </div>
    <div class="flex py-3 items-center justify-end h-12">
      <slot name="right" class="flex justify-end"></slot>
      <Separator :orientation="'vertical'" class="mx-2"></Separator>
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
      <Avatar class="size-7 mx-2">
        <router-link to="/account/profile">
          <AvatarImage src="/src/assets/avatar.jpg"></AvatarImage>
        </router-link>
      </Avatar>
    </div>
  </div>
</template>

<style scoped lang="css">
.top-bar {
  border-bottom: 1px solid #E4E4E4;
  height: 50px;
}
</style>