import {Component} from "vue";
import IconAlignBottom from "@/components/ui/icon/style/align/IconAlignBottom.vue";
import IconAlignBottomFilled from "@/components/ui/icon/style/align/IconAlignBottomFilled.vue";
import IconAlignCenterH from "@/components/ui/icon/style/align/IconAlignCenterH.vue";
import IconAlignCenterHFilled from "@/components/ui/icon/style/align/IconAlignCenterHFilled.vue";
import IconAlignCenterV from "@/components/ui/icon/style/align/IconAlignCenterV.vue";
import IconAlignCenterVFilled from "@/components/ui/icon/style/align/IconAlignCenterVFilled.vue";
import IconAlignLeft from "@/components/ui/icon/style/align/IconAlignLeft.vue";
import IconAlignLeftFilled from "@/components/ui/icon/style/align/IconAlignLeftFilled.vue";
import IconAlignRight from "@/components/ui/icon/style/align/IconAlignRight.vue";
import IconAlignRightFilled from "@/components/ui/icon/style/align/IconAlignRightFilled.vue";
import IconAlignTop from "@/components/ui/icon/style/align/IconAlignTop.vue";
import IconAlignTopFilled from "@/components/ui/icon/style/align/IconAlignTopFilled.vue";
import IconLayer from "@/components/ui/icon/style/layer/IconLayer.vue";
import IconLayerFilled from "@/components/ui/icon/style/layer/IconLayerFilled.vue";
import IconLayoutColumn from "@/components/ui/icon/style/layout/IconLayoutColumn.vue";
import IconLayoutColumnFilled from "@/components/ui/icon/style/layout/IconLayoutColumnFilled.vue";
import IconLayoutGrid from "@/components/ui/icon/style/layout/IconLayoutGrid.vue";
import IconLayoutLeftSideBar from "@/components/ui/icon/style/layout/IconLayoutLeftSideBar.vue";
import IconLayoutLeftSideBarFilled from "@/components/ui/icon/style/layout/IconLayoutLeftSideBarFilled.vue";
import IconLayoutGridFilled from "@/components/ui/icon/style/layout/IconLayoutGridFilled.vue";
import IconLayoutRightSideBar from "@/components/ui/icon/style/layout/IconLayoutRightSideBar.vue";
import IconLayoutRightSideBarFilled from "@/components/ui/icon/style/layout/IconLayoutRightSideBarFilled.vue";
import IconLayoutRow from "@/components/ui/icon/style/layout/IconLayoutRow.vue";
import IconLayoutRowFilled from "@/components/ui/icon/style/layout/IconLayoutRowFilled.vue";

export const iconStyleNameList: IconStyleName[] = ['style.align.bottom'
    , 'style.align.bottom.filled'
    , 'style.align.center.horizontal'
    , 'style.align.center.horizontal.filled'
    , 'style.align.center.vertical'
    , 'style.align.center.vertical.filled'
    , 'style.align.left'
    , 'style.align.left.filled'
    , 'style.align.right'
    , 'style.align.right.filled'
    , 'style.align.top'
    , 'style.align.top.filled'
    , 'style.layer'
    , 'style.layer.filled'
    , 'style.layout.column'
    , 'style.layout.column.filled'
    , 'style.layout.grid'
    , 'style.layout.grid.filled'
    , 'style.layout.left.sidebar'
    , 'style.layout.left.sidebar.filled'
    , 'style.layout.right.sidebar'
    , 'style.layout.right.sidebar.filled'
    , 'style.layout.row'
    , 'style.layout.row.filled']

export type IconStyleName = 'style.align.bottom'
    | 'style.align.bottom.filled'
    | 'style.align.center.horizontal'
    | 'style.align.center.horizontal.filled'
    | 'style.align.center.vertical'
    | 'style.align.center.vertical.filled'
    | 'style.align.left'
    | 'style.align.left.filled'
    | 'style.align.right'
    | 'style.align.right.filled'
    | 'style.align.top'
    | 'style.align.top.filled'
    | 'style.layer'
    | 'style.layer.filled'
    | 'style.layout.column'
    | 'style.layout.column.filled'
    | 'style.layout.grid'
    | 'style.layout.grid.filled'
    | 'style.layout.left.sidebar'
    | 'style.layout.left.sidebar.filled'
    | 'style.layout.right.sidebar'
    | 'style.layout.right.sidebar.filled'
    | 'style.layout.row'
    | 'style.layout.row.filled'

export const iconStyleComponents: { [key in IconStyleName]: Component } = {
    'style.align.bottom': IconAlignBottom,
    'style.align.bottom.filled': IconAlignBottomFilled,
    'style.align.center.horizontal': IconAlignCenterH,
    'style.align.center.horizontal.filled': IconAlignCenterHFilled,
    'style.align.center.vertical': IconAlignCenterV,
    'style.align.center.vertical.filled': IconAlignCenterVFilled,
    'style.align.left': IconAlignLeft,
    'style.align.left.filled': IconAlignLeftFilled,
    'style.align.right': IconAlignRight,
    'style.align.right.filled': IconAlignRightFilled,
    'style.align.top': IconAlignTop,
    'style.align.top.filled': IconAlignTopFilled,
    'style.layer': IconLayer,
    'style.layer.filled': IconLayerFilled,
    'style.layout.column': IconLayoutColumn,
    'style.layout.column.filled': IconLayoutColumnFilled,
    'style.layout.grid': IconLayoutGrid,
    'style.layout.grid.filled': IconLayoutGridFilled,
    'style.layout.left.sidebar': IconLayoutLeftSideBar,
    'style.layout.left.sidebar.filled': IconLayoutLeftSideBarFilled,
    'style.layout.right.sidebar': IconLayoutRightSideBar,
    'style.layout.right.sidebar.filled': IconLayoutRightSideBarFilled,
    'style.layout.row': IconLayoutRow,
    'style.layout.row.filled': IconLayoutRowFilled,
}











