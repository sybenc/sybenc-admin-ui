import {formCommonIcon, formCommonStyle} from "@/components/lowcode/config/form/common.ts";

export const inputDefaultConfig: LowCodeInputComponent = {
    id: '',
    component: 'Input',
    layer: 0,
    lock: false,
    group: 'form',
    icon: formCommonIcon,
    label: '输入框',
    animations: [],
    events: {},
    style: {
        ...formCommonStyle,
        gap: '10px',
    },
    propsValue: {
        id: 'id',
        type: 'email',
        label: '标签',
        placeholder: '输入提示',
        labelShow: true,
        placeholderShow: true,
        display: 'horizontal',
    },
}