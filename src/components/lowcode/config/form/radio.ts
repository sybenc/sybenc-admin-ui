import {formCommonStyle, formCommonStyleMap} from "@/components/lowcode/config/form/common.ts";

export const radioDefaultConfig: LowCodeRadioComponent = {
    id: '',
    component: 'Radio',
    group: 'form',
    icon: 'fluent:checkmark-circle-24-regular',
    label: '单选框',
    animations: [],
    events: {},
    style: {
        ...formCommonStyle,
        'z-index': '0',
    },
    propsValue: {
        id: ['0','1'],
        label: ['标签0', '标签1'],
        value: ['值0', '值1']
    },
}
export const radioStyleMap = {
    ...formCommonStyleMap,
}