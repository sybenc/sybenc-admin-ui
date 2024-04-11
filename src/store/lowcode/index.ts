import {defineStore} from "pinia"
import {reactive, ref} from "vue";
import {generateID, swap} from "@/lib/utils.ts";
import {lowCodeDefaultConfig} from "@/components/lowcode/config";
import {lowCodeComponentMap} from "@/components/lowcode/component";

interface LowCodeCanvas {
    data: CommonComponentConfig[],
    width: string,
    height: string
}

interface LowCodeCommand {
    execute: () => void,
    undo: () => void,
    component: CommonComponentConfig,
    oldComponent?: CommonComponentConfig,
    index?: number,
    top?: string,
    left?: string,
    description: string
}

interface LowCodeHistoryOperation {
    command: LowCodeCommand,
    canvasCurrentSelected: CommonComponentConfig | null,
    oldCanvasCurrentSelected: CommonComponentConfig | null,
}

export const useLowCodeStore = defineStore('low-code', () => {
    //存储画布中组件数据
    const canvas = reactive<LowCodeCanvas>({
        data: [],
        width: '1200px',
        height: '1200px'
    })

    //画布中此时此刻被选中的组件
    const canvasCurrentSelected = ref<CommonComponentConfig | null>(null)
    //画布中上一个被选中的组件，用于撤销、重做操作还原状态
    const oldCanvasCurrentSelected = ref<CommonComponentConfig | null>(null)
    const setCanvasCurrentSelected = (component: CommonComponentConfig) => {
        canvasCurrentSelected.value = component
    }
    // 当前组名称
    const currentGroupName = ref<LowCodeGroupName>('form')
    const scaleShow = ref<boolean>(true)

    // 历史操作记录
    const historyOperation = reactive<LowCodeHistoryOperation[]>([])
    let historyOperationIndex = -1

    const setCurrentGroupName = (name: LowCodeGroupName) => {
        currentGroupName.value = name
    }
    const setScaleShow = () => {
        scaleShow.value = !scaleShow.value
    }
    // 得到当前组存储预设组件默认配置，这是用于预设组件列表的控制
    const getCurrentGroupDefaultConfigListByName = (name: LowCodeGroupName): {
        [key: string]: CommonComponentConfig
    } => {
        return lowCodeDefaultConfig[name]
    }
    const getComponent = (groupName: string, componentName: string) => {
        return lowCodeComponentMap[groupName][componentName]
    }
    //根据组件的注册名得到组件的默认配置
    const getComponentDefaultConfig = (groupName: string, componentName: string): CommonComponentConfig => {
        return lowCodeDefaultConfig[groupName][componentName]
    }

    function execute(createCommand: (component: CommonComponentConfig, oldComponent?: CommonComponentConfig) => LowCodeCommand,
                     component: CommonComponentConfig,
                     oldComponent?: CommonComponentConfig) {
        let command = createCommand(component)
        if(oldComponent) {
            command = createCommand(component, oldComponent)
        }
        command.execute()
        // 如果在执行操作的时候，后面还有记录，则删除后续所有记录
        if (historyOperation.length - 1 > historyOperationIndex) {
            historyOperation.splice(historyOperationIndex + 1, historyOperation.length - 1 - historyOperationIndex)
        }
        historyOperationIndex++
        historyOperation.push({
            command,
            canvasCurrentSelected: canvasCurrentSelected.value,
            oldCanvasCurrentSelected: oldCanvasCurrentSelected.value
        })
    }

    function undo() {
        if (historyOperationIndex < 0) return
        const command = historyOperation[historyOperationIndex].command
        command.undo()
        canvasCurrentSelected.value = historyOperation[historyOperationIndex].canvasCurrentSelected
        historyOperationIndex--
    }

    function redo() {
        if (historyOperationIndex >= historyOperation.length - 1) return
        historyOperationIndex++
        const command = historyOperation[historyOperationIndex].command
        command.execute()
        canvasCurrentSelected.value = historyOperation[historyOperationIndex].oldCanvasCurrentSelected
    }

    function createCommandAddComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: "添加一个组件",
            execute: () => {
                //指定组件唯一ID
                component.id = generateID()
                //置顶元素层级
                component.layer = canvas.data.length
                //添加元素到画布
                canvas.data.push(component)
            },
            undo: () => {
                if (canvas.data.length > 0) {
                    //删除数组中最后一个元素即可
                    canvas.data.pop()
                }
            }
        }
    }

    function createCommandDeleteComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: "删除一个组件",
            execute: () => {
                canvas.data.splice(index, 1)
            },
            undo: () => {
                canvas.data.splice(index, 0, component)
            }
        }
    }

    const swapTwoComponent = (index1: number, index2: number) => {
        //调整元素层级
        const tempLayer = canvas.data[index1].layer
        canvas.data[index1].layer = canvas.data[index2].layer
        canvas.data[index2].layer = tempLayer
        swap(canvas.data, index1, index2)
    }

    function createCommandSetBottomComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: "置底一个组件",
            execute: () => {
                //得到要交换的两个组件的索引
                const index1 = index
                const index2 = 0
                swapTwoComponent(index1, index2)
            },
            undo: () => {
                //得到要交换的两个组件的索引
                const index1 = index
                const index2 = 0
                swapTwoComponent(index1, index2)
            }
        }
    }

    function createCommandSetTopComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: "置底一个组件",
            execute: () => {
                //得到要交换的两个组件的索引
                const index1 = index
                const index2 = canvas.data.length - 1
                swapTwoComponent(index1, index2)
            },
            undo: () => {
                //得到要交换的两个组件的索引
                const index1 = index
                const index2 = canvas.data.length - 1
                swapTwoComponent(index1, index2)
            }
        }
    }

    function createCommandLockComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: "锁定一个组件",
            execute: () => {
                component.lock = true
            },
            undo: () => {
                component.lock = false
            }
        }
    }

    function createCommandUnlockComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: "解锁一个组件",
            execute: () => {
                component.lock = false
            },
            undo: () => {
                component.lock = true
            }
        }
    }

    function createCommandMoveComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: "移动一个组件",
            execute: () => {
                canvas.data[index].style.top = component?.style.top
                canvas.data[index].style.left = component?.style.left
            },
            undo: () => {
                canvas.data[index].style.top = oldComponent?.style.top
                canvas.data[index].style.left = oldComponent?.style.left
            }
        }
    }

    return {
        canvas,
        canvasCurrentSelected,
        oldCanvasCurrentSelected,
        scaleShow,
        currentGroupName,
        getComponent,
        getComponentDefaultConfig,
        setCurrentGroupName,
        setCanvasCurrentSelected,
        setScaleShow,
        getCurrentGroupDefaultConfigListByName,

        execute,
        undo,
        redo,
        createCommandAddComponent,
        createCommandDeleteComponent,
        createCommandSetTopComponent,
        createCommandSetBottomComponent,
        createCommandLockComponent,
        createCommandUnlockComponent,
        createCommandMoveComponent,
    }
})