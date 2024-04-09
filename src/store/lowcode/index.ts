import {defineStore} from "pinia"
import {reactive, ref} from "vue";
import generateID from "@/lib/utils.ts";
import {lowCodeDefaultConfig} from "@/components/lowcode/config";
import {lowCodeComponentMap} from "@/components/lowcode/widget";

export const useLowCodeStore = defineStore('low-code', () => {
    //存储画布中组件数据
    const canvasData = reactive<CommonComponentConfig[]>([])

    //画布中此时此刻被选中的组件
    const canvasCurrentSelected = ref<CommonComponentConfig | null>(null)
    const setCanvasCurrentSelected = (component: CommonComponentConfig) => {
        canvasCurrentSelected.value = component
    }

    // 当前组名称
    const currentGroupName = ref<LowCodeGroupName>('form')
    const setCurrentGroupName = (name: LowCodeGroupName) => {
        currentGroupName.value = name
    }
    // 得到当前组存储预设组件默认配置，这是用于预设组件列表的控制
    const getCurrentGroupDefaultConfigListByName = (name: LowCodeGroupName): {
        [key: string]: CommonComponentConfig
    } => {
        return lowCodeDefaultConfig[name]
    }

    //添加一个组件到画布
    const addComponentOnCanvas = (component: CommonComponentConfig) => {
        //指定组件唯一ID
        component.id = generateID()
        //设置层级
        component.style['z-index'] = canvasData.length
        canvasData.unshift(component)
    }
    const getComponent = (groupName: string, componentName: string) => {
        return lowCodeComponentMap[groupName][componentName]
    }
    //根据组件的注册名得到组件的默认配置
    const getComponentDefaultConfig = (groupName: string, componentName: string): CommonComponentConfig => {
        return lowCodeDefaultConfig[groupName][componentName]
    }

    const scaleShow = ref<boolean>(true)
    const setScaleShow = () => {
        scaleShow.value = !scaleShow.value
    }

    const deleteComponentByIndex = (index: number) => {
        canvasData.splice(index, 1)
    }

    /**
     * 将指定索引的组件置于画布底部
     * @param {number} index - 要置底的组件索引
     */
    const setBottomComponentByIndex = (index: number) => {
        if (index < 0 || index >= canvasData.length) {
            throw new Error("Index out of bounds.")
        }
        let tempComponent = canvasData[canvasData.length - 1]
        canvasData[canvasData.length - 1] = canvasData[index]
        canvasData[index] = tempComponent
    }

    /**
     * 将指定索引的组件置于画布顶部
     * @param {number} index - 要置顶的组件索引
     */
    const setTopComponentByIndex = (index: number) => {
        if (index < 0 || index >= canvasData.length) {
            throw new Error("Index out of bounds.")
        }
        let tempComponent = canvasData[0]
        canvasData[0] = canvasData[index]
        canvasData[index] = tempComponent
    }


    return {
        canvasData,
        canvasCurrentSelected,
        scaleShow,
        currentGroupName,
        addComponentOnCanvas,
        getComponent,
        getComponentDefaultConfig,
        setCurrentGroupName,
        setCanvasCurrentSelected,
        setScaleShow,
        getCurrentGroupDefaultConfigListByName,
        deleteComponentByIndex,
        setBottomComponentByIndex,
        setTopComponentByIndex
    }
})