import {formComponentMap} from "@/components/lowcode/component/form";
import {Component} from "vue";
import {geometryComponentMap} from "@/components/lowcode/component/geometry";
import {formCommonIcon} from "@/components/lowcode/config/form/common.ts";
import {geometryCommonIcon} from "@/components/lowcode/config/geometry/common.ts";
import {chartsCommonIcon} from "@/components/lowcode/config/charts/common.ts";


/**
 * 导出组件列表，用于在<components/>渲染组件时找到组件
 */
export const lowCodeComponentMap: { [key: string]: { [key: string]: Component } } = {
    form: formComponentMap,
    geometry: geometryComponentMap,
}

export const lowCodeGroupMap: { [key: string]: LowCodeGroupItem } = {
    form: {label: '表单', name: 'form', icon: formCommonIcon},
    geometry: {label: '几何图形', name: 'geometry', icon: geometryCommonIcon},
    charts: {label: '图表', name: 'charts', icon: chartsCommonIcon}
}