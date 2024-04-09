import {inputDefaultConfig} from "@/components/lowcode/config/form/input.ts";
import {radioDefaultConfig} from "@/components/lowcode/config/form/radio.ts";

// 导出表单的默认配置文件
export const formLowCodeDefaultConfig: { [key: string]: CommonComponentConfig } = {
    input: inputDefaultConfig,
    radio: radioDefaultConfig
}