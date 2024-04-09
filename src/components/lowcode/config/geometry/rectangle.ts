import {
    geometryCommonStyle,
    geometryCommonStyleMap
} from "@/components/lowcode/config/geometry/common.ts";

export const rectangleDefaultConfig: LowCodeRectangleComponent = {
    id: '',
    component: 'Rectangle',
    group: 'geometry',
    icon: 'fluent:rectangle-landscape-24-regular',
    label: '矩形',
    animations: [],
    events: {},
    style: {
        ...geometryCommonStyle,
        border: '1px solid transparent ',
        'z-index': '0',
    },
    propsValue: {},
}
export const rectangleStyleMap = {
    ...geometryCommonStyleMap,
}