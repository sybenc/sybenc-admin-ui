<script setup lang="ts">
import Icon from "@/components/ui/icon/Icon.vue";
import {iconSoftNameList} from "@/components/ui/icon/soft";
import {iconUserNameList} from "@/components/ui/icon/user";
import {iconChartNameList} from "@/components/ui/icon/chart";
import {iconSystemNameList} from "@/components/ui/icon/system";
import {iconStyleNameList} from "@/components/ui/icon/style";
</script>

<template>
  <div>Soft</div>
  <div class="grid grid-cols-12">
    <Icon v-for="value in iconSoftNameList" :key="value" :name="value" class="size-10"/>
  </div>
  <div>User</div>
  <div class="grid grid-cols-12">
    <Icon v-for="value in iconUserNameList" :key="value" :name="value" class="size-10"/>
  </div>
  <div>Chart</div>
  <div class="grid grid-cols-12">
    <Icon v-for="value in iconChartNameList" :key="value" :name="value" class="size-10"/>
  </div>
  <div>System</div>
  <div class="grid grid-cols-12">
    <Icon v-for="value in iconSystemNameList" :key="value" :name="value" class="size-10"/>
  </div>
  <div>Style</div>
  <div class="grid grid-cols-12">
    <Icon v-for="value in iconStyleNameList" :key="value" :name="value" class="size-10"/>
  </div>
</template>

<style scoped lang="css">

</style>