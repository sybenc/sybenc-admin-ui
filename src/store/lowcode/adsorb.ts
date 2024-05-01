import {defineStore} from "pinia";
import {reactive} from "vue";
import {useLowCodeCanvasStore} from "@/store/lowcode/canvas.ts";
import {useLowCodeRulerStore} from "@/store/lowcode/ruler.ts";
import {remove, sortBy} from "lodash";

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

export interface DistanceLine {
    //两点间距离
    distance: number
    targetComponent: CommonComponentConfig | null
    type: DistanceLineType
    show: boolean
}

type DistanceLines = { [key in DistanceLineType]: DistanceLine }

export interface DistanceBlock {
    top: number
    left: number
    height?: number
    width?: number
}

export interface ResizeLine {
    top: number
    left: number
    height: number
    width: number
}


export const useLowCodeAdsorbStore = defineStore('low-code-adsorb', () => {
    const canvasStore = useLowCodeCanvasStore()
    const rulerStore = useLowCodeRulerStore()
    //间距线
    const distanceLines = reactive<DistanceLines>({
        lr: {type: 'lr', distance: 0, targetComponent: null, show: false},
        rl: {type: 'rl', distance: 0, targetComponent: null, show: false},
        tb: {type: 'tb', distance: 0, targetComponent: null, show: false},
        bt: {type: 'bt', distance: 0, targetComponent: null, show: false}
    })
    //间距吸附条件
    const distanceAdsorbCondition = {
        vertical: [4, 8, 12, 16, 20, 24],
        horizontal: [4, 8, 12, 16, 20, 24],
    }
    //间距块
    const distanceBlocks = reactive<{ [key in Orientation]: Map<number, DistanceBlock[]> }>({
        vertical: new Map<number, DistanceBlock[]>(),
        horizontal: new Map<number, DistanceBlock[]>()
    })
    //默认吸附距离
    const lineAdsorbGap = 3
    //六条对齐线，这个对齐线是作用于目标组件上的
    const alignmentLines = reactive<AlignmentLine>({
        vl: {type: 'vl', orientation: 'vertical', show: false},
        vc: {type: 'vc', orientation: 'vertical', show: false},
        vr: {type: 'vr', orientation: 'vertical', show: false},
        ht: {type: 'ht', orientation: 'horizontal', show: false},
        hc: {type: 'hc', orientation: 'horizontal', show: false},
        hb: {type: 'hb', orientation: 'horizontal', show: false}
    })
    //缩放线
    const resizeLines = reactive<{ [key in 'height' | 'width']: ResizeLine[] }>({
        height: [],
        width: []
    })

    /**
     * 判断两个值是否临近
     * @param sourceValue 源值
     * @param targetValue 目标值
     * @param gap 最大差值的绝对值
     */
    function _isNearly(sourceValue: number, targetValue: number, gap?: number): boolean {
        const gapValue = gap ? gap : lineAdsorbGap
        return Math.abs(sourceValue - targetValue) <= gapValue
    }

    function clearDistanceLinesStatus() {
        for (let key in distanceLines) {
            distanceLines[key as DistanceLineType].show = false
        }
    }

    function clearDistanceBlocksStatus() {
        distanceBlocks.vertical.clear()
        distanceBlocks.horizontal.clear()
    }

    function clearAlignmentLineStatus() {
        for (let key in alignmentLines) {
            alignmentLines[key as AlignmentLineType].show = false
        }
    }

    function clearResizeLinesStatus() {
        resizeLines.height.splice(0, resizeLines.height.length)
        resizeLines.width.splice(0, resizeLines.width.length)
    }

    function _checkDistanceLineCondition(needToShow: AlignmentLineType[], sourceComponent: CommonComponentConfig) {
        if (canvasStore.canvas.data.length === 1) return
        const sourceTop = parseFloat(sourceComponent.style.top)
        const sourceLeft = parseFloat(sourceComponent.style.left)
        const sourceWidth = parseFloat(sourceComponent.style.width)
        const sourceHeight = parseFloat(sourceComponent.style.height)
        //四个方向上是组件的最小距离
        let minTopDistance = 100000
        let minLeftDistance = 100000
        let minBottomDistance = 100000
        let minRightDistance = 100000
        //源组件上、右、下、左四个方向上是否存在组件，用于控制间距线的显示条数
        const hasComponent = [false, false, false, false]
        const componentOnAlignmentLine: {
            [key in Orientation]: [position1: number, position2: number, component: CommonComponentConfig][]
        } = {
            vertical: [[sourceTop, sourceTop + sourceHeight, sourceComponent]],
            horizontal: [[sourceLeft, sourceLeft + sourceWidth, sourceComponent]]
        }

        //是否达到展示间距线的条件，只有在对齐线上的、距离源组件最近的组件才显示间距线
        function showCondition(targetComponent: CommonComponentConfig, distanceLineType: DistanceLineType) {
            const targetTop = parseFloat(targetComponent.style.top)
            const targetLeft = parseFloat(targetComponent.style.left)
            const targetWidth = parseFloat(targetComponent.style.width)
            const targetHeight = parseFloat(targetComponent.style.height)
            //当前对齐线是竖直的还是水平的
            const hasAlignmentLineV = needToShow.includes('vr') || needToShow.includes('vc') || needToShow.includes('vl')
            const hasAlignmentLineH = needToShow.includes('ht') || needToShow.includes('hc') || needToShow.includes('hb')
            //目标组件的边缘是否对应对齐线位置，这用于控制距离线是否显示
            const targetComponentOnAlignmentLineV = (alignmentLines.vl.show && targetLeft === parseFloat(alignmentLines.vl.left as string))
                || (alignmentLines.vc.show && targetLeft + targetWidth / 2 === parseFloat(alignmentLines.vc.left as string))
                || (alignmentLines.vr.show && targetLeft + targetWidth === parseFloat(alignmentLines.vr.left as string))
            const targetComponentOnAlignmentLineH = (alignmentLines.ht.show && targetTop === parseFloat(alignmentLines.ht.top as string))
                || (alignmentLines.hc.show && targetTop + targetHeight / 2 === parseFloat(alignmentLines.hc.top as string))
                || (alignmentLines.hb.show && targetTop + targetHeight === parseFloat(alignmentLines.hb.top as string))
            if (/l/.test(distanceLineType)) {
                return hasAlignmentLineH && targetComponentOnAlignmentLineH
            } else {
                return hasAlignmentLineV && targetComponentOnAlignmentLineV
            }
        }


        //是否达到间距吸附条件
        function checkDistanceAdsorb(targetComponent: CommonComponentConfig, distanceLine: DistanceLine) {
            const targetTop = parseFloat(targetComponent.style.top)
            const targetLeft = parseFloat(targetComponent.style.left)
            const targetWidth = parseFloat(targetComponent.style.width)
            const targetHeight = parseFloat(targetComponent.style.height)
            distanceAdsorbCondition.vertical.forEach((item: number) => {
                if (_isNearly(item, distanceLine.distance, 2)) {
                    if (distanceLine.type === 'tb')
                        sourceComponent.style.top = `${targetTop + targetHeight + item}px`
                    else if (distanceLine.type === 'bt')
                        sourceComponent.style.top = `${targetTop - item - sourceHeight}px`
                    distanceLine.distance = item
                }
            })
            for (let key of distanceBlocks.vertical.keys()) {
                if (_isNearly(key, distanceLine.distance, 2)) {
                    if (distanceLine.type === 'tb')
                        sourceComponent.style.top = `${targetTop + targetHeight + key}px`
                    else if (distanceLine.type === 'bt')
                        sourceComponent.style.top = `${targetTop - key - sourceHeight}px`
                    distanceLine.distance = key
                }
            }
            distanceAdsorbCondition.horizontal.forEach((item: number) => {
                if (_isNearly(item, distanceLine.distance, 2)) {
                    if (distanceLine.type === 'rl')
                        sourceComponent.style.left = `${targetLeft - item - sourceWidth}px`
                    else if (distanceLine.type === 'lr')
                        sourceComponent.style.left = `${targetLeft + targetWidth + item}px`
                    distanceLine.distance = item
                }
            })
            for (let key of distanceBlocks.horizontal.keys()) {
                if (_isNearly(key, distanceLine.distance, 2)) {
                    if (distanceLine.type === 'rl')
                        sourceComponent.style.left = `${targetLeft - key - sourceWidth}px`
                    else if (distanceLine.type === 'lr')
                        sourceComponent.style.left = `${targetLeft + targetWidth + key}px`
                    distanceLine.distance = key
                }
            }
        }

        function checkDistanceBlocks() {
            // 检索间距块位置
            clearDistanceBlocksStatus()
            const verticalComponents = sortBy(componentOnAlignmentLine.vertical, tuple => tuple[0])
            const horizontalComponents = sortBy(componentOnAlignmentLine.horizontal, tuple => tuple[0])

            // 如果前后两个组件相交，不计入间距块
            for (let i = 0; i < verticalComponents.length - 1; i++) {
                if (!verticalComponents[i + 1]) break
                let distance = verticalComponents[i + 1][0] - verticalComponents[i][1]
                const top = parseFloat(verticalComponents[i][2].style.top)
                const left = parseFloat(verticalComponents[i][2].style.left)
                const width = parseFloat(verticalComponents[i][2].style.width)
                const height = parseFloat(verticalComponents[i][2].style.height)
                if (distance <= 0) continue
                else {
                    //防止源组件周围间距块闪烁
                    if (verticalComponents[i][2].id === sourceComponent.id
                        || verticalComponents[i + 1][2].id === sourceComponent.id) {
                        distanceAdsorbCondition.vertical.forEach((item: number) => {
                            if (_isNearly(item, distance, 2))
                                distance = item
                        })
                        for (let key of distanceBlocks.vertical.keys()) {
                            if (_isNearly(key, distance, 2))
                                distance = key
                        }
                    }
                    const block: DistanceBlock = {
                        top: top + height,
                        left: left,
                        width: width,
                        height: distance,
                    }
                    if (distanceBlocks.vertical.has(distance)) {
                        distanceBlocks.vertical.get(distance)?.push(block)
                    } else {
                        distanceBlocks.vertical.set(distance, [block])
                    }
                }
            }
            for (let i = 0; i < horizontalComponents.length - 1; i++) {
                if (!horizontalComponents[i + 1]) break
                let distance = horizontalComponents[i + 1][0] - horizontalComponents[i][1]
                const top = parseFloat(horizontalComponents[i][2].style.top)
                const left = parseFloat(horizontalComponents[i][2].style.left)
                const width = parseFloat(horizontalComponents[i][2].style.width)
                const height = parseFloat(horizontalComponents[i][2].style.height)
                if (distance <= 0) continue
                else {
                    if (horizontalComponents[i][2].id === sourceComponent.id
                        || horizontalComponents[i + 1][2].id === sourceComponent.id) {
                        distanceAdsorbCondition.horizontal.forEach((item: number) => {
                            if (_isNearly(item, distance, 2))
                                distance = item
                            for (let key of distanceBlocks.horizontal.keys()) {
                                if (_isNearly(key, distance, 2))
                                    distance = key
                            }
                        })
                    }
                    const block: DistanceBlock = {
                        top: top,
                        left: left + width,
                        width: distance,
                        height: height
                    }
                    if (distanceBlocks.horizontal.has(distance)) {
                        distanceBlocks.horizontal.get(distance)?.push(block)
                    } else {
                        distanceBlocks.horizontal.set(distance, [block])
                    }
                }
            }
        }

        canvasStore.canvas.data.forEach((item: CommonComponentConfig) => {
            if (item.id === sourceComponent.id) return
            const targetTop = parseFloat(item.style.top)
            const targetLeft = parseFloat(item.style.left)
            const targetWidth = parseFloat(item.style.width)
            const targetHeight = parseFloat(item.style.height)
            //目标组件的是不是包含了对齐线的位置，这里主要为寻找距离块作准备
            if (needToShow.includes('vr')) {
                if (targetLeft + targetWidth >= parseFloat(alignmentLines.vr.left as string)
                    && targetLeft <= parseFloat(alignmentLines.vr.left as string)) {
                    componentOnAlignmentLine.vertical.push([targetTop, targetTop + targetHeight, item])
                }
            } else if (needToShow.includes('vl')) {
                if (targetLeft + targetWidth >= parseFloat(alignmentLines.vl.left as string)
                    && targetLeft <= parseFloat(alignmentLines.vl.left as string)) {
                    componentOnAlignmentLine.vertical.push([targetTop, targetTop + targetHeight, item])
                }
            } else if (needToShow.includes('vc')) {
                if (targetLeft + targetWidth >= parseFloat(alignmentLines.vc.left as string)
                    && targetLeft <= parseFloat(alignmentLines.vc.left as string)) {
                    componentOnAlignmentLine.vertical.push([targetTop, targetTop + targetHeight, item])
                }
            }
            if (needToShow.includes('ht')) {
                if (targetTop + targetHeight >= parseFloat(alignmentLines.ht.top as string)
                    && targetTop <= parseFloat(alignmentLines.ht.top as string)) {
                    componentOnAlignmentLine.horizontal.push([targetLeft, targetLeft + targetWidth, item])
                }
            } else if (needToShow.includes('hc')) {
                if (targetTop + targetHeight >= parseFloat(alignmentLines.hc.top as string)
                    && targetTop <= parseFloat(alignmentLines.hc.top as string)) {
                    componentOnAlignmentLine.horizontal.push([targetLeft, targetLeft + targetWidth, item])
                }
            } else if (needToShow.includes('hb')) {
                if (targetTop + targetHeight >= parseFloat(alignmentLines.hb.top as string)
                    && targetTop <= parseFloat(alignmentLines.hb.top as string)) {
                    componentOnAlignmentLine.horizontal.push([targetLeft, targetLeft + targetWidth, item])
                }
            }

            //是否在源组件上方
            if (sourceTop >= targetTop + targetHeight) {
                if (showCondition(item, 'tb')) {
                    hasComponent[0] = true
                    const topDistance = sourceTop - (targetTop + targetHeight)
                    if (topDistance < minTopDistance) {
                        minTopDistance = topDistance
                        distanceLines.tb.distance = topDistance
                        distanceLines.tb.targetComponent = item
                        checkDistanceAdsorb(item, distanceLines.tb)
                    }
                }
            }
            //是否在源组件右方
            if (sourceLeft + sourceWidth <= targetLeft) {
                if (showCondition(item, 'rl')) {
                    hasComponent[1] = true
                    const rightDistance = targetLeft - (sourceLeft + sourceWidth)
                    if (rightDistance < minRightDistance) {
                        minRightDistance = rightDistance
                        distanceLines.rl.distance = rightDistance
                        distanceLines.rl.targetComponent = item
                        checkDistanceAdsorb(item, distanceLines.rl)
                    }
                }
            }
            //是否在源组件下方
            if (sourceTop + sourceHeight <= targetTop) {
                if (showCondition(item, 'bt')) {
                    hasComponent[2] = true
                    const bottomDistance = targetTop - (sourceTop + sourceHeight)
                    if (bottomDistance < minBottomDistance) {
                        minBottomDistance = bottomDistance
                        distanceLines.bt.distance = bottomDistance
                        distanceLines.bt.targetComponent = item
                        checkDistanceAdsorb(item, distanceLines.bt)
                    }
                }
            }
            //是否在源组件左方
            if (sourceLeft >= targetLeft + targetWidth) {
                if (showCondition(item, 'lr')) {
                    hasComponent[3] = true
                    const leftDistance = sourceLeft - (targetLeft + targetWidth)
                    if (leftDistance < minLeftDistance) {
                        minLeftDistance = leftDistance
                        distanceLines.lr.distance = leftDistance
                        distanceLines.lr.targetComponent = item
                        checkDistanceAdsorb(item, distanceLines.lr)
                    }
                }
            }
            //左右两个方向都有组件，显示较短的一条间距线
            if (hasComponent[1] && hasComponent[3]) {
                if (distanceLines.rl.distance > distanceLines.lr.distance) {
                    hasComponent[1] = false
                } else {
                    hasComponent[3] = false
                }
            }
            //上下两个方向都有组件，显示较短的一条间距线
            if (hasComponent[0] && hasComponent[2]) {
                if (distanceLines.tb.distance > distanceLines.bt.distance) {
                    hasComponent[0] = false
                } else {
                    hasComponent[2] = false
                }
            }
            ['tb', 'rl', 'bt', 'lr'].forEach((value: string, index: number) => {
                distanceLines[value as DistanceLineType].show = hasComponent[index]
            })

        })
        checkDistanceBlocks()
    }

    function _chooseTrueAlignmentLine(needToShow: AlignmentLineType[], diffX: number, diffY: number) {
        //元素向左移动，从左到右显示三条竖线
        if (diffX < 0) {
            if (needToShow.includes('vl') && needToShow.includes('vr')) {
                alignmentLines.vl.show = true
                alignmentLines.vc.show = true
                alignmentLines.vr.show = true
            } else if (needToShow.includes('vl')) {
                alignmentLines.vl.show = true
            } else if (needToShow.includes('vc')) {
                alignmentLines.vc.show = true
            } else if (needToShow.includes('vr')) {
                alignmentLines.vr.show = true
            }
        }
        //反之，从左往右显示三天竖线
        else {
            if (needToShow.includes('vl') && needToShow.includes('vr')) {
                alignmentLines.vl.show = true
                alignmentLines.vc.show = true
                alignmentLines.vr.show = true
            } else if (needToShow.includes('vr')) {
                alignmentLines.vr.show = true
            } else if (needToShow.includes('vc')) {
                alignmentLines.vc.show = true
            } else if (needToShow.includes('vl')) {
                alignmentLines.vl.show = true
            }
        }
        //如果向上移动
        if (diffY < 0) {
            if (needToShow.includes('ht') && needToShow.includes('hb')) {
                alignmentLines.ht.show = true
                alignmentLines.hc.show = true
                alignmentLines.hb.show = true
            } else if (needToShow.includes('ht')) {
                alignmentLines.ht.show = true
            } else if (needToShow.includes('hc')) {
                alignmentLines.hc.show = true
            } else if (needToShow.includes('hb')) {
                alignmentLines.hb.show = true
            }
        }
        //如果向下移动
        else {
            if (needToShow.includes('ht') && needToShow.includes('hb')) {
                alignmentLines.ht.show = true
                alignmentLines.hc.show = true
                alignmentLines.hb.show = true
            } else if (needToShow.includes('hb')) {
                alignmentLines.hb.show = true
            } else if (needToShow.includes('hc')) {
                alignmentLines.hc.show = true
            } else if (needToShow.includes('ht')) {
                alignmentLines.ht.show = true
            }
        }

        //移除不需要展示的对齐线
        for (let key in alignmentLines) {
            if (!alignmentLines[key as AlignmentLineType].show) {
                remove(needToShow, (item) => item === alignmentLines[key as AlignmentLineType].type)
            }
        }
    }

    /**
     * 寻找当前移动组件的对齐线和间距线
     * @param sourceComponent 当前移动的组件
     * @param diffX
     * @param diffY
     */
    function checkAlignmentLineCondition(sourceComponent: CommonComponentConfig, diffX: number, diffY: number) {
        clearAlignmentLineStatus()
        const sourceTop = parseFloat(sourceComponent.style.top)
        const sourceLeft = parseFloat(sourceComponent.style.left)
        const sourceWidth = parseFloat(sourceComponent.style.width)
        const sourceHeight = parseFloat(sourceComponent.style.height)
        //寻找对齐线
        const needToShow: AlignmentLineType[] = []
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
                    needToShow.push(condition.line.type)
                })
            }
        })
        _chooseTrueAlignmentLine(needToShow, diffX, diffY)
        _checkDistanceLineCondition(needToShow, sourceComponent)
    }

    function checkGuideLineCondition(sourceComponent: CommonComponentConfig) {
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
                    isNearly: _isNearly(sourceLeft, (guideLinePosition - 16) / canvasStore.getScale(), 4),
                    line: item,
                    sourceComponent: sourceComponent,
                    sourcePosition: guideLinePosition,
                },
                {
                    isNearly: _isNearly(sourceLeft + sourceWidth / 2, (guideLinePosition - 16) / canvasStore.getScale(), 4),
                    line: item,
                    sourceComponent: sourceComponent,
                    sourcePosition: guideLinePosition - sourceWidth / 2,
                },
                {
                    isNearly: _isNearly(sourceLeft + sourceWidth, (guideLinePosition - 16) / canvasStore.getScale(), 4),
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
                    isNearly: _isNearly(sourceTop, guideLinePosition, 4),
                    line: item,
                    sourceComponent: sourceComponent,
                    sourcePosition: guideLinePosition,
                },
                {
                    isNearly: _isNearly(sourceTop + sourceHeight / 2, guideLinePosition, 4),
                    line: item,
                    sourceComponent: sourceComponent,
                    sourcePosition: guideLinePosition - sourceHeight / 2,
                },
                {
                    isNearly: _isNearly(sourceTop + sourceHeight, guideLinePosition, 4),
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

    function checkResizeCondition(sourceComponent: CommonComponentConfig) {
        clearResizeLinesStatus()
        const sourceHeight = parseFloat(sourceComponent.style.height)
        const sourceWidth = parseFloat(sourceComponent.style.width)
        canvasStore.canvas.data.forEach((item: CommonComponentConfig) => {
            const targetTop = parseFloat(item.style.top)
            const targetLeft = parseFloat(item.style.left)
            const targetWidth = parseFloat(item.style.width)
            const targetHeight = parseFloat(item.style.height)
            if (sourceWidth === targetWidth) {
                resizeLines.width.push({top: targetTop - 8, left: targetLeft, width: targetWidth, height: 1})
            }
            if (sourceHeight === targetHeight) {
                resizeLines.height.push({top: targetTop, left: targetLeft - 8, width: 1, height: targetHeight})
            }
        })
        //如果数组长度为1，说明没有和源组件长宽一样的目标组件，清空数组
        if (resizeLines.width.length === 1)
            resizeLines.width.splice(0, 1)
        if (resizeLines.height.length === 1)
            resizeLines.height.splice(0, 1)
    }

    return {
        alignmentLines,
        distanceLines,
        distanceBlocks,
        resizeLines,
        checkAlignmentLineCondition,
        checkGuideLineCondition,
        clearAlignmentLineStatus,
        clearDistanceLinesStatus,
        clearDistanceBlocksStatus,
        clearResizeLinesStatus,
        checkResizeCondition,
    }
})