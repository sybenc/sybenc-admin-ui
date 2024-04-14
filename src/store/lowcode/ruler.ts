import {defineStore} from "pinia";
import {reactive} from "vue";

export const useLowCodeRulerStore = defineStore('low-code-ruler', () => {
    const ruler = reactive<LowCodeRuler>({
        length: 5000,
        width: 16,
        scale: '100%',
        scaleCenter: [0, 0],
        show: true,
        guideLineV: [],
        guideLineH: []
    })

    function getScale(): number {
        return parseInt(ruler.scale) / 100
    }

    function getScaleStyle() {
        const scale = ruler.scale
        return `transform: scale(${scale});transform-origin:left top;`
    }

    function createGuideLine(orientation: Orientation, position: number) {
        const line = {orientation, position}
        if (orientation === 'vertical') {
            ruler.guideLineV.push(line)
        } else {
            ruler.guideLineH.push(line)
        }
    }

    function deleteGuideLine(line: LowCodeGuideLine, index: number) {
        if (line.orientation === 'vertical') {
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
