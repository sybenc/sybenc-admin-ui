import {Component} from "vue";
import {iconSoftComponents, IconSoftName} from "@/components/ui/icon/soft";
import {iconUserComponents, IconUserName} from "@/components/ui/icon/user";
import {iconChartComponents, IconChartName} from "@/components/ui/icon/chart";
import {iconSystemComponents, IconSystemName} from "@/components/ui/icon/system";
import {iconStyleComponents, IconStyleName} from "@/components/ui/icon/style";

export type IconName = IconSoftName
    | IconUserName
    | IconChartName
    | IconSystemName
    | IconStyleName

export const iconComponents: { [key in IconName]: Component } = {
    ...iconUserComponents,
    ...iconSoftComponents,
    ...iconChartComponents,
    ...iconSystemComponents,
    ...iconStyleComponents
}