import {
    geometryCommonStyle,
    geometryCommonStyleMap
} from "@/components/lowcode/config/geometry/common.ts";

export const rectangleDefaultConfig: LowCodeRectangleComponent = {
    id: '',
    component: 'Rectangle',
    layer: 0,
    group: 'geometry',
    icon: 'fluent:rectangle-landscape-24-regular',
    label: '矩形',
    animations: [],
    events: {},
    style: {
        ...geometryCommonStyle,
        border: '1px solid transparent ',
    },
    propsValue: {},
}
export const rectangleStyleMap = {
    ...geometryCommonStyleMap,
}