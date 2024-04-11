import {
    geometryCommonStyle,
    geometryCommonStyleMap
} from "@/components/lowcode/config/geometry/common.ts";

export const circleDefaultConfig: LowCodeCircleComponent = {
    id: '',
    component: 'Circle',
    layer: 0,
    lock: false,
    group: 'geometry',
    icon: 'fluent:circle-28-regular',
    label: '椭圆形',
    animations: [],
    events: {},
    style: {
        ...geometryCommonStyle,
        'border-radius': '50%',
        border: '1px solid transparent',
    },
    propsValue: {},
}
export const radioStyleMap = {
    ...geometryCommonStyleMap,
}