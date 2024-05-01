export interface UserModel {
    username: string
    nickname?: string
    createdAt: string
    deletedAt: string
    loginAt: string
    password?: string
    email?: string
    status?: string
    phone?: string
}

export interface UserListModel {
    totalCount: number
    items: UserModel[]
}