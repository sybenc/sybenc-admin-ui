import {defineStore} from "pinia";
import {reactive} from "vue";
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";
import {useLowCodeRulerStore} from "@/store/lowcode/ruler.ts";

interface AlignmentCondition {
    isNearly: boolean
    line: Line
    targetComponent: CommonComponentConfig
    linePosition: number
    sourcePosition: number
}

interface GuideLineCondition {
    isNearly: boolean
    line: LowCodeGuideLine
    sourceComponent: CommonComponentConfig
    sourcePosition: number
}

export const useLowCodeAdsorbStore = defineStore('low-code-adsorb', () => {
    const canvasStore = useLowCodeCanvasStore()
    const rulerStore = useLowCodeRulerStore()
    const lineAdsorbGap = 2.5
    // 六条对齐线，这个对齐线是作用于目标组件上的
    const alignmentLines = reactive<AlignmentLine>({
        vl: {type: 'vl', orientation: 'vertical', show: false},
        vc: {type: 'vc', orientation: 'vertical', show: false},
        vr: {type: 'vr', orientation: 'vertical', show: false},
        ht: {type: 'ht', orientation: 'horizontal', show: false},
        hc: {type: 'hc', orientation: 'horizontal', show: false},
        hb: {type: 'hb', orientation: 'horizontal', show: false}
    })

    function _isNearly(sourceValue: number, targetValue: number): boolean {
        return Math.abs(sourceValue - targetValue) <= lineAdsorbGap
    }

    function clearStatus() {
        for (let key in alignmentLines) {
            alignmentLines[key as LineType].show = false
        }
    }

    function checkAlignmentAdsorbCondition(sourceComponent: CommonComponentConfig) {
        clearStatus()
        const sourceTop = parseFloat(sourceComponent.style.top)
        const sourceLeft = parseFloat(sourceComponent.style.left)
        const sourceWidth = parseFloat(sourceComponent.style.width)
        const sourceHeight = parseFloat(sourceComponent.style.height)
        canvasStore.canvas.data.forEach((item: CommonComponentConfig) => {
            if (item === sourceComponent) return
            const targetTop = parseFloat(item.style.top)
            const targetLeft = parseFloat(item.style.left)
            const targetWidth = parseFloat(item.style.width)
            const targetHeight = parseFloat(item.style.height)
            const conditions: { [key in Orientation]: AlignmentCondition[] } = {
                horizontal: [
                    {   // 当被拖动元素顶部与参考元素顶部相邻时
                        isNearly: _isNearly(sourceTop, targetTop),
                        line: alignmentLines.ht,
                        targetComponent: item,
                        linePosition: targetTop,
                        sourcePosition: targetTop,
                    },
                    {   // 当被拖动元素底部与参考元素顶部相邻时
                        isNearly: _isNearly(sourceTop + sourceHeight, targetTop),
                        line: alignmentLines.ht,
                        targetComponent: item,
                        linePosition: targetTop,
                        sourcePosition: targetTop - sourceHeight
                    },
                    {   // 当被拖动元素中间与参考元素中间相邻时
                        isNearly: _isNearly(sourceTop + sourceHeight / 2, targetTop + targetHeight / 2),
                        line: alignmentLines.hc,
                        targetComponent: item,
                        linePosition: targetTop + targetHeight / 2,
                        sourcePosition: targetTop + targetHeight / 2 - sourceHeight / 2
                    },
                    {   // 当被拖动元素底部与参考元素底部相邻时
                        isNearly: _isNearly(sourceTop + sourceHeight, targetTop + targetHeight),
                        line: alignmentLines.hb,
                        targetComponent: item,
                        linePosition: targetTop + targetHeight,
                        sourcePosition: targetTop + targetHeight - sourceHeight
                    },
                    {   // 当被拖动元素顶部与参考元素底部相邻时
                        isNearly: _isNearly(sourceTop, targetTop + targetHeight),
                        line: alignmentLines.hb,
                        targetComponent: item,
                        linePosition: targetTop + targetHeight,
                        sourcePosition: targetTop + targetHeight
                    }
                ],
                vertical: [
                    {   // 当被拖动元素左侧与参考元素左侧相邻时
                        isNearly: _isNearly(sourceLeft, targetLeft),
                        line: alignmentLines.vl,
                        targetComponent: item,
                        linePosition: targetLeft,
                        sourcePosition: targetLeft
                    },
                    {   // 当被拖动元素右侧与参考元素左侧相邻时
                        isNearly: _isNearly(sourceLeft + sourceWidth, targetLeft),
                        line: alignmentLines.vl,
                        targetComponent: item,
                        linePosition: targetLeft,
                        sourcePosition: targetLeft - sourceWidth
                    },
                    {   //当被拖动元素中间与参考元素中间相邻时
                        isNearly: _isNearly(sourceLeft + sourceWidth / 2, targetLeft + targetWidth / 2),
                        line: alignmentLines.vc,
                        targetComponent: item,
                        linePosition: targetLeft + targetWidth / 2,
                        sourcePosition: targetLeft + targetWidth / 2 - sourceWidth / 2
                    },
                    {   // 当被拖动元素右侧与参考元素右侧相邻时
                        isNearly: _isNearly(sourceLeft + sourceWidth, targetLeft + targetWidth),
                        line: alignmentLines.vr,
                        targetComponent: item,
                        linePosition: targetLeft + targetWidth,
                        sourcePosition: targetLeft + targetWidth - sourceWidth
                    },
                    {   // 当被拖动元素左侧与参考元素右侧相邻时
                        isNearly: _isNearly(sourceLeft, targetLeft + targetWidth),
                        line: alignmentLines.vr,
                        targetComponent: item,
                        linePosition: targetLeft + targetWidth,
                        sourcePosition: targetLeft + targetWidth
                    }
                ]
            }
            //  遍历吸附条件，触发吸附效果并显示辅助线
            for (let key in conditions) {
                conditions[key as Orientation].forEach((condition: AlignmentCondition) => {
                    if (!condition.isNearly) return

                    if (key === 'vertical') {
                        sourceComponent.style.left = `${condition.sourcePosition}px`
                        condition.line.left = `${condition.linePosition}px`
                    } else {
                        sourceComponent.style.top = `${condition.sourcePosition}px`
                        condition.line.top = `${condition.linePosition}px`
                    }
                    condition.line.show = true
                })
            }
        })
    }

    function checkGuideLineAdsorbCondition(sourceComponent: CommonComponentConfig) {
        const sourceTop = parseFloat(sourceComponent.style.top)
        const sourceLeft = parseFloat(sourceComponent.style.left)
        const sourceWidth = parseFloat(sourceComponent.style.width)
        const sourceHeight = parseFloat(sourceComponent.style.height)
        rulerStore.ruler.guideLineV.forEach((item: LowCodeGuideLine, index: number) => {
            const guideLinePosition = item.position
            // 索引0是预览辅助线，直接跳过
            if (index === 0) return
            const conditions: GuideLineCondition[] = [
                {
                    isNearly: _isNearly(sourceLeft, (guideLinePosition - 16) / canvasStore.getScale()),
                    line: item,
                    sourceComponent: sourceComponent,
                    sourcePosition: guideLinePosition,
                },
                {
                    isNearly: _isNearly(sourceLeft + sourceWidth / 2, (guideLinePosition - 16) / canvasStore.getScale()),
                    line: item,
                    sourceComponent: sourceComponent,
                    sourcePosition: guideLinePosition - sourceWidth / 2,
                },
                {
                    isNearly: _isNearly(sourceLeft + sourceWidth, (guideLinePosition - 16) / canvasStore.getScale()),
                    line: item,
                    sourceComponent: sourceComponent,
                    sourcePosition: guideLinePosition - sourceWidth,
                },
            ]
            for (let i = 0; i < 3; i++) {
                if (!conditions[i].isNearly) continue
                conditions[i].sourceComponent.style.left = `${(conditions[i].sourcePosition - 15) / canvasStore.getScale()}px`
            }
        })
        rulerStore.ruler.guideLineH.forEach((item: LowCodeGuideLine, index: number) => {
            if (index === 0) return
            const guideLinePosition = item.position
            const conditions: GuideLineCondition[] = [
                {
                    isNearly: _isNearly(sourceTop, guideLinePosition),
                    line: item,
                    sourceComponent: sourceComponent,
                    sourcePosition: guideLinePosition,
                },
                {
                    isNearly: _isNearly(sourceTop + sourceHeight / 2, guideLinePosition),
                    line: item,
                    sourceComponent: sourceComponent,
                    sourcePosition: guideLinePosition - sourceHeight / 2,
                },
                {
                    isNearly: _isNearly(sourceTop + sourceHeight, guideLinePosition),
                    line: item,
                    sourceComponent: sourceComponent,
                    sourcePosition: guideLinePosition - sourceHeight,
                },
            ]
            for (let i = 0; i < 3; i++) {
                if (!conditions[i].isNearly) continue
                conditions[i].sourceComponent.style.top = `${conditions[i].sourcePosition + 1}px`
            }
        })
    }

    return {
        alignmentLines,
        checkAlignmentAdsorbCondition,
        checkGuideLineAdsorbCondition,
        clearStatus
    }
})