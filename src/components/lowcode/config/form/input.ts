import {formCommonIcon, formCommonStyle, formCommonStyleMap} from "@/components/lowcode/config/form/common.ts";

export const inputDefaultConfig: LowCodeInputComponent = {
    id: '',
    component: 'Input',
    layer: 0,
    group: 'form',
    icon: formCommonIcon,
    label: '输入框',
    animations: [],
    events: {},
    style: {
        ...formCommonStyle,
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