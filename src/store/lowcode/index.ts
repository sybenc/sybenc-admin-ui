import {defineStore} from "pinia"
import {reactive, ref} from "vue";
import {generateID, swap} from "@/lib/utils.ts";
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
        //置顶元素层级
        component.layer = canvasData.length
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

    /**
     * 将指定的组件删除
     * @param {CommonComponentConfig} component - 要删除的组件
     */
    const deleteComponent = (component: CommonComponentConfig) => {
        const index = canvasData.findIndex((item: CommonComponentConfig) => item.id === component.id)
        canvasData.splice(index, 1)
    }

    /**
     * 将指定的组件置于画布底部
     * @param {CommonComponentConfig} component - 要置底的组件
     */
    const setBottomComponent = (component: CommonComponentConfig) => {
        const index1 = canvasData.findIndex((item: CommonComponentConfig) => item.id === component.id)
        const index2 = canvasData.length - 1
        //调整元素层级
        const tempLayer = canvasData[index1].layer
        canvasData[index1].layer = canvasData[index2].layer
        canvasData[index2].layer = tempLayer
        swap(canvasData, index1, index2)
    }

    /**
     * 将指定的组件置于画布顶部
     * @param {CommonComponentConfig} component - 要置顶的组件
     */
    const setTopComponent = (component: CommonComponentConfig) => {
        const index1 = canvasData.findIndex((item: CommonComponentConfig) => item.id === component.id)
        const index2 = 0
        //调整元素层级
        const tempLayer = canvasData[index1].layer
        canvasData[index1].layer = canvasData[index2].layer
        canvasData[index2].layer = tempLayer
        swap(canvasData, index1, index2)
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
        deleteComponent,
        setBottomComponent,
        setTopComponent
    }
})