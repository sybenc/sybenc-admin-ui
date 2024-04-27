import {iconSoftComponents, IconSoftName} from "@/components/ui/icon/soft";
import {iconUserComponents, IconUserName} from "@/components/ui/icon/user";
import {Component} from "vue";

export type IconName = IconSoftName | IconUserName

export const iconComponents: { [key in IconName]: Component } = {
    ...iconUserComponents,
    ...iconSoftComponents
}