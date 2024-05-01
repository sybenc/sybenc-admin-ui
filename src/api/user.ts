import httpRequest from "@/api/axios.ts";
import {UserListModel, UserModel} from "@/api/type/user.ts";


export const getUser = async (username: string)=> {
    return await httpRequest.get<UserModel>({url: `/user/${username}`})
}

export const getUserList = async () => {
    return await httpRequest.get<UserListModel>({url: '/user'})
}

export const createUser = async (user: UserModel) => {
    return await httpRequest.post({url: '/user', data: user})
}

export const updateUser = async (username: string) => {
    return await httpRequest.put({url: `/user/${username}`})
}

export const deleteUser = async (username: string) => {
    return await httpRequest.delete({url: `/user/${username}`})
}
