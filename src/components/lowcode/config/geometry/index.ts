import {circleDefaultConfig} from "@/components/lowcode/config/geometry/circle.ts";
import {rectangleDefaultConfig} from "@/components/lowcode/config/geometry/rectangle.ts";
import {lineDefaultConfig} from "@/components/lowcode/config/geometry/line.ts";

// 导出表单的默认配置文件
export const geometryLowCodeDefaultConfig: { [key: string]: CommonComponentConfig } = {
    rectangle: rectangleDefaultConfig,
    circle: circleDefaultConfig,
    line: lineDefaultConfig
}