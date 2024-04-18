import {defineStore} from "pinia";
import {reactive} from "vue";
interface LowCodeRuler {
    length: number
    width: number
    scale: string
    show: boolean
    markColor: string
    bgColor: string
    moveBlockColor: string
    guideLineV: LowCodeGuideLine[]
    guideLineH: LowCodeGuideLine[]
}

export const useLowCodeRulerStore = defineStore('low-code-ruler', () => {
    const ruler = reactive<LowCodeRuler>({
        length: 5000,
        width: 16,
        scale: '100%',
        show: true,
        markColor: '',
        bgColor: '',
        moveBlockColor:`#D3C6F1`,
        guideLineV: [{orientation: 'vertical', position: -10, show: false}],
        guideLineH: [{orientation: 'horizontal', position: -10, show: false}],
    })

    // 得到缩放比例的浮点数
    function getScale(): number {
        return parseFloat(ruler.scale) / 100
    }

    // 的到缩放比例的画布样式
    function getScaleStyle() {
        const scale = ruler.scale
        return `transform: scale(${scale});transform-origin:left top;`
    }

    /**
     * 检查参考线是否已经存在
     * @param line 需要检查的参考线参数
     */
    function _isGuideLineExist(line: LowCodeGuideLine): boolean {
        let result = false
        if (line.orientation === 'vertical') {
            for (let i = 1; i < ruler.guideLineV.length; i++) {
                if (Math.floor(line.position) === Math.floor(ruler.guideLineV[i].position)) {
                    result = true
                    break
                }
            }
        } else {
            for (let i = 1; i < ruler.guideLineH.length; i++) {
                if (Math.floor(line.position) === Math.floor(ruler.guideLineH[i].position))
                    result = true
            }
        }
        return result
    }

    /**
     * 创建一条参考线
     * @param orientation 参考线的方向
     * @param position 参考线的位置
     */
    function createGuideLine(orientation: Orientation, position: number) {
        const line = {orientation, position, show: true}
        if (_isGuideLineExist(line)) return
        if (orientation === 'vertical') {
            ruler.guideLineV.push(line)
        } else {
            ruler.guideLineH.push(line)
        }
    }

    /**
     * 删除一条参考线
     * @param orientation 参考线的朝向
     * @param index 参考线的索引
     */
    function deleteGuideLine(orientation: Orientation, index: number) {
        if (orientation === 'vertical') {
            ruler.guideLineV.splice(index, 1)
        } else {
            ruler.guideLineH.splice(index, 1)
        }
    }

    return {
        ruler,
        getScaleStyle,
        getScale,
        createGuideLine,
        deleteGuideLine,
    }
})
