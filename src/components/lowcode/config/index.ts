import {formLowCodeDefaultConfig} from "@/components/lowcode/config/form";
import {geometryLowCodeDefaultConfig} from "@/components/lowcode/config/geometry";

export const lowCodeDefaultConfig: { [key in LowCodeGroupName]: { [key: string]: CommonComponentConfig } } = {
    form: formLowCodeDefaultConfig,
    geometry: geometryLowCodeDefaultConfig,
    charts: geometryLowCodeDefaultConfig
}