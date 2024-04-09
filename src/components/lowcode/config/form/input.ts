import {formCommonIcon, formCommonStyle, formCommonStyleMap} from "@/components/lowcode/config/form/common.ts";

export const inputDefaultConfig: LowCodeInputComponent = {
    id: '',
    component: 'Input',
    group: 'form',
    icon: formCommonIcon,
    label: '输入框',
    animations: [],
    events: {},
    style: {
        ...formCommonStyle,
        'z-index': '0',
    },
    propsValue: {
        id: 'id',
        type: 'username',
        label: '标签',
        placeholder: '输入提示'
    },
}

export const inputStyleMap = {
    ...formCommonStyleMap,

}