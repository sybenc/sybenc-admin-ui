<script setup lang="ts">
import {ref, onBeforeMount} from 'vue'
import DataTable from "@/components/ui/table/datatable/DataTable.vue";
import {ContentTopBar} from "@/components/base/layout";
import {userTableColumns} from "@/components/base/user/user-table/columns.ts";
import {getUserList} from "@/api/user.ts";
import {ResponseModel} from "@/api/type";
import {UserListModel, UserModel} from "@/api/type/user.ts";

const data = ref<UserModel[]>([])

onBeforeMount(() => {
  getUserList().then((res: ResponseModel<UserListModel>) => {
    data.value = res.data.items
  })
})
</script>

<template>
  <div class="h-full w-full">
    <ContentTopBar/>
    <div class="flex h-full w-full">
      <div class="flex flex-col w-1/6 h-full border-r"></div>
      <div class="p-4 w-5/6">
        <DataTable :columns="userTableColumns" :data="data"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">

</style>