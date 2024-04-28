import {Component} from "vue";
import IconChartArea from "@/components/ui/icon/chart/line/IconChartArea.vue";
import IconChartFunnel from "@/components/ui/icon/chart/funnel/IconChartFunnel.vue";
import IconChartFunnelFilled from "@/components/ui/icon/chart/funnel/IconChartFunnelFilled.vue";
import IconChartBar from "@/components/ui/icon/chart/bar/IconChartBar.vue";
import IconChartBarFilled from "@/components/ui/icon/chart/bar/IconChartBarFilled.vue";
import IconChartHeatMap from "@/components/ui/icon/chart/heatmap/IconChartHeatMap.vue";
import IconChartLine from "@/components/ui/icon/chart/line/IconChartLine.vue";
import IconChartMap from "@/components/ui/icon/chart/map/IconChartMap.vue";
import IconChartMapFilled from "@/components/ui/icon/chart/map/IconChartMapFilled.vue";
import IconChartPie from "@/components/ui/icon/chart/pie/IconChartPie.vue";
import IconChartPieFilled from "@/components/ui/icon/chart/pie/IconChartPieFilled.vue";
import IconChartSunbrust from "@/components/ui/icon/chart/sunbrust/IconChartSunbrust.vue";
import IconChartSunbrustFilled from "@/components/ui/icon/chart/sunbrust/IconChartSunbrustFilled.vue";
import IconChartTreeMap from "@/components/ui/icon/chart/treemap/IconChartTreeMap.vue";
import IconChartTreeMapFilled from "@/components/ui/icon/chart/treemap/IconChartTreeMapFilled.vue";
import IconChartDots from "@/components/ui/icon/chart/dots/IconChartDots.vue";
import IconChartDotsFilled from "@/components/ui/icon/chart/dots/IconChartDotsFilled.vue";
import IconChartCandle from "@/components/ui/icon/chart/bar/IconChartCandle.vue";
import IconChartCandleFilled from "@/components/ui/icon/chart/bar/IconChartCandleFilled.vue";
import IconChartWaterfall from "@/components/ui/icon/chart/bar/IconChartWaterfall.vue";
import IconChartRadar from "@/components/ui/icon/chart/radar/IconChartRadar.vue";

export const iconChartNameList: IconChartName[] = ['chart.area'
    , 'chart.bar'
    , 'chart.bar.filled'
    , 'chart.funnel'
    , 'chart.funnel.filled'
    , 'chart.heatmap'
    , 'chart.line'
    , 'chart.map'
    , 'chart.map.filled'
    , 'chart.pie'
    , 'chart.pie.filled'
    , 'chart.dots'
    , 'chart.dots.filled'
    , 'chart.sunbrust'
    , 'chart.sunbrust.filled'
    , 'chart.treemap'
    , 'chart.treemap.filled'
    , 'chart.candle'
    , 'chart.candle.filled'
    , 'chart.waterfall'
    , 'chart.radar']

export type IconChartName = 'chart.area'
    | 'chart.bar'
    | 'chart.bar.filled'
    | 'chart.funnel'
    | 'chart.funnel.filled'
    | 'chart.heatmap'
    | 'chart.line'
    | 'chart.map'
    | 'chart.map.filled'
    | 'chart.pie'
    | 'chart.pie.filled'
    | 'chart.dots'
    | 'chart.dots.filled'
    | 'chart.sunbrust'
    | 'chart.sunbrust.filled'
    | 'chart.treemap'
    | 'chart.treemap.filled'
    | 'chart.candle'
    | 'chart.candle.filled'
    | 'chart.waterfall'
    | 'chart.radar'

export const iconChartComponents: { [key in IconChartName]: Component } = {
    "chart.area": IconChartArea,
    "chart.bar": IconChartBar,
    "chart.bar.filled": IconChartBarFilled,
    "chart.funnel": IconChartFunnel,
    "chart.funnel.filled": IconChartFunnelFilled,
    "chart.heatmap": IconChartHeatMap,
    "chart.line": IconChartLine,
    "chart.map": IconChartMap,
    "chart.map.filled": IconChartMapFilled,
    "chart.pie": IconChartPie,
    "chart.pie.filled": IconChartPieFilled,
    "chart.dots": IconChartDots,
    "chart.dots.filled": IconChartDotsFilled,
    "chart.sunbrust": IconChartSunbrust,
    "chart.sunbrust.filled": IconChartSunbrustFilled,
    "chart.treemap": IconChartTreeMap,
    "chart.treemap.filled": IconChartTreeMapFilled,
    "chart.candle": IconChartCandle,
    "chart.candle.filled": IconChartCandleFilled,
    "chart.waterfall": IconChartWaterfall,
    "chart.radar": IconChartRadar
}