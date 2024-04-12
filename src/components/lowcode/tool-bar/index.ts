import {formLowCodeToolBarConfig} from "@/components/lowcode/tool-bar/form";
import {geometryLowCodeToolBarConfig} from "@/components/lowcode/tool-bar/geometry";

export const lowCodeToolBarConfig:{[key in LowCodeGroupName]:any} = {
    form: formLowCodeToolBarConfig,
    geometry: geometryLowCodeToolBarConfig,
    charts: geometryLowCodeToolBarConfig
}