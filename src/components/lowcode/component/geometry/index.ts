import {Component} from "vue";
import Circle from "@/components/lowcode/component/geometry/circle/Circle.vue";
import Rectangle from "@/components/lowcode/component/geometry/rectangle/Rectangle.vue";
import Line from "@/components/lowcode/component/geometry/line/Line.vue";

export const geometryComponentMap: {[key: string]: Component} = {
    Rectangle,
    Circle,
    Line
}