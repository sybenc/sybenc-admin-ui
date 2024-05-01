import {defineStore} from "pinia";
import {UserModel} from "@/api/type/user.ts";
import {reactive} from "vue";

export const useSystemUserStore = defineStore('system-user', () => {
    const userList = reactive({
        data: [] as UserModel[]
    })

    return {userList}
})