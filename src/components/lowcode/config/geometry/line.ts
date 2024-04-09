import {
    geometryCommonStyle,
    geometryCommonStyleMap
} from "@/components/lowcode/config/geometry/common.ts";

export const lineDefaultConfig: LowCodeLineComponent = {
    id: '',
    component: 'Line',
    group: 'geometry',
    icon: 'fluent:line-24-regular',
    label: '直线',
    animations: [],
    events: {},
    style: {
        ...geometryCommonStyle,
        'z-index': '0',
        height: '3px',
        'border-bottom': '3px solid black'
    },
    propsValue: {},
}
export const lineStyleMap = {
    ...geometryCommonStyleMap,
}