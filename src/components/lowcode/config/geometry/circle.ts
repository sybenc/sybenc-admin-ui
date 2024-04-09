import {
    geometryCommonStyle,
    geometryCommonStyleMap
} from "@/components/lowcode/config/geometry/common.ts";

export const circleDefaultConfig: LowCodeCircleComponent = {
    id: '',
    component: 'Circle',
    group: 'geometry',
    icon: 'fluent:circle-28-regular',
    label: '椭圆形',
    animations: [],
    events: {},
    style: {
        ...geometryCommonStyle,
        'border-radius': '50%',
        border: '1px solid transparent',
        'z-index': '0',
    },
    propsValue: {},
}
export const radioStyleMap = {
    ...geometryCommonStyleMap,
}