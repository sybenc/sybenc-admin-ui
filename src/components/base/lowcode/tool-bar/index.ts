import {Component} from "vue";
import LowCodeToolComponent from "@/components/base/lowcode/tool-bar/LowCodeToolComponent.vue";
import LowCodeToolCanvas from "@/components/base/lowcode/tool-bar/LowCodeToolCanvas.vue";

export const lowCodeToolComponent: {[key: string]: Component} = {
    LowCodeToolComponent,
    LowCodeToolCanvas
}