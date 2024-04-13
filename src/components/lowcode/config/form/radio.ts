import {formCommonStyle} from "@/components/lowcode/config/form/common.ts";

export const radioDefaultConfig: LowCodeRadioComponent = {
    id: '',
    component: 'Radio',
    layer: 0,
    lock: false,
    group: 'form',
    icon: 'fluent:checkmark-circle-24-regular',
    label: '单选框',
    animations: [],
    events: {},
    style: {
        ...formCommonStyle,
    },
    propsValue: {
        id: ['0', '1'],
        label: ['标签0', '标签1'],
        value: ['值0', '值1']
    },
}