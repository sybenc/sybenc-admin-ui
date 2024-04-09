import {Component} from "vue";
import Circle from "@/components/lowcode/widget/geometry/circle/Circle.vue";
import Rectangle from "@/components/lowcode/widget/geometry/rectangle/Rectangle.vue";
import Line from "@/components/lowcode/widget/geometry/line/Line.vue";

export const geometryComponentMap: {[key: string]: Component} = {
    Rectangle,
    Circle,
    Line
}