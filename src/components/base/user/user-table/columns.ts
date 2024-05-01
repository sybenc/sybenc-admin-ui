import {UserModel} from "@/api/type/user.ts";
import {ColumnDef} from "@tanstack/vue-table";
import {h, Ref} from "vue";
import {Checkbox} from "@/components/ui/checkbox";
import {EditableText} from "@/components/ui/editable-text";

export const userTableColumns: ColumnDef<UserModel>[] = [
    {
        id: 'select',
        header: ({table}) => h('div', {
            class: 'mr-2 flex items-center justify-center'
        }, [
            h(Checkbox, {
                'checked': table.getIsAllPageRowsSelected(),
                'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(value),
                'ariaLabel': 'Select all',
            })
        ]),
        cell: ({row}) => h('div', {
            class: 'mr-2 flex items-center justify-center'
        }, [
            h(Checkbox, {
                'checked': row.getIsSelected(),
                'onUpdate:checked': (value: boolean) => row.toggleSelected(value),
                'ariaLabel': 'Select row',
            })
        ]),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'username',
        header: () => h('div', {}, '用户名'),
        cell: ({row}) => h(EditableText, {
            modelValue: row.getValue('username'),
            class: 'lowercase',
            style: 'line-height:16px;'
        })
    },
    {
        accessorKey: 'nickname',
        header: () => h('div', {}, '昵称'),
        cell: ({row}) => h(EditableText, {
            modelValue: row.getValue('nickname'),
            class: 'lowercase',
            style: 'line-height:16px;'
        })
    },
    {
        accessorKey: 'email',
        header: () => h('div', {}, '邮箱'),
        cell: ({row}) => h(EditableText, {
            modelValue: row.getValue('email'),
            class: 'lowercase',
            style: 'line-height:16px;'
        })
    },
    {
        accessorKey: 'phone',
        header: () => h('div', {}, '手机'),
        cell: ({row}) => h(EditableText, {
            modelValue: row.getValue('phone'),
            class: 'lowercase',
            style: 'line-height:16px;'
        })
    },
    {
        accessorKey: 'status',
        header: () => h('div', {}, '状态'),
        cell: ({row}) => h('div', {
            class: 'lowercase',
            style: 'line-height:16px;'
        }, row.getValue('status'))
    },
    {
        accessorKey: 'createdAt',
        header: () => h('div', {}, '加入时间'),
        cell: ({row})=>{
            const createdAt = row.getValue('createdAt') as Ref
            const formatted = new Intl.DateTimeFormat('zh-CN', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            }).format(createdAt.value)

            return h('div', {}, formatted)
        }
    },
    {
        accessorKey: 'loginAt',
        header: () => h('div', {}, '最后登录'),
        cell: ({row})=>{
            const loginAt = row.getValue('loginAt') as Ref
            const formatted = new Intl.DateTimeFormat('zh-CN', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            }).format(loginAt.value)

            return h('div', {}, formatted)
        }
    }
]