import {defineStore} from "pinia"
import {reactive, ref, watch} from "vue";
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
    description: {
        icon: string,
        label: string
    }
}

interface LowCodeHistoryOperation {
    command: LowCodeCommand,
    canvasCurrentSelected: CommonComponentConfig | null,
    oldCanvasCurrentSelected: CommonComponentConfig | null,
}

type ToolBarController = 'LowCodeToolCanvas' | 'LowCodeToolComponent'
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
    // 是否显示量尺
    const scaleShow = ref<boolean>(true)
    // 控制历史记录显示
    const historyOperationShow = ref<boolean>(false)
    // 控制工具栏显示
    const toolBarController = ref<ToolBarController>('LowCodeToolCanvas')
    // 监测canvasCurrentSelected的变化，决定工具栏应该显示什么内容
    watch(canvasCurrentSelected, () => {
        if (canvasCurrentSelected.value === null) {
            if (toolBarController.value !== 'LowCodeToolCanvas')
                toolBarController.value = 'LowCodeToolCanvas'
        } else {
            toolBarController.value = 'LowCodeToolComponent'
        }
    })
    // 历史操作记录
    const historyOperation = reactive<LowCodeHistoryOperation[]>([])
    let historyOperationIndex = ref<number>(-1)

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
    const getComponentDefaultConfig = (groupName: LowCodeGroupName, componentName: string): CommonComponentConfig => {
        return lowCodeDefaultConfig[groupName][componentName]
    }

    /**
     * 执行命令的函数
     * @param createCommand 创建命令的函数
     * @param component 命令操作的组件
     * @param oldComponent 可选参数，如果用到命令操作之前组件的数据，需要传入
     */
    function execute(createCommand: (component: CommonComponentConfig, oldComponent?: CommonComponentConfig) => LowCodeCommand,
                     component: CommonComponentConfig,
                     oldComponent?: CommonComponentConfig) {
        let command = createCommand(component)
        if (oldComponent) {
            command = createCommand(component, oldComponent)
        }
        command.execute()
        // 如果在执行操作的时候，后面还有记录，则删除后续所有记录
        if (historyOperation.length - 1 > historyOperationIndex.value) {
            historyOperation.splice(historyOperationIndex.value + 1, historyOperation.length - 1 - historyOperationIndex.value)
        }
        historyOperationIndex.value++
        historyOperation.push({
            command,
            canvasCurrentSelected: canvasCurrentSelected.value,
            oldCanvasCurrentSelected: oldCanvasCurrentSelected.value
        })
    }

    //撤销操作
    function undo() {
        if (historyOperationIndex.value < 0) return
        const command = historyOperation[historyOperationIndex.value].command
        command.undo()
        canvasCurrentSelected.value = historyOperation[historyOperationIndex.value].canvasCurrentSelected
        historyOperationIndex.value--
    }

    //重做操作
    function redo() {
        if (historyOperationIndex.value >= historyOperation.length - 1) return
        historyOperationIndex.value++
        const command = historyOperation[historyOperationIndex.value].command
        command.execute()
        canvasCurrentSelected.value = historyOperation[historyOperationIndex.value].oldCanvasCurrentSelected
    }

    /**
     * 从历史记录恢复画布
     * @param index 要恢复到的画布状态的索引
     */
    function recoverByHistory(index: number) {
        if (historyOperationIndex.value >= index) {
            for (let i = historyOperationIndex.value; i > index; i--) undo()
        } else {
            for (let i = historyOperationIndex.value; i < index; i++) redo()
        }
    }

    //生成添加组件的命令，交与execute()函数处理
    function createCommandAddComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: {
                icon: 'fluent:add-28-filled',
                label: '添加组件'
            },
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

    //生成删除组件的命令，交与execute()函数处理
    function createCommandDeleteComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: {
                icon: 'mynaui:x',
                label: '删除组件'
            },
            execute: () => {
                canvas.data.splice(index, 1)
            },
            undo: () => {
                canvas.data.splice(index, 0, component)
            }
        }
    }

    /**
     * 用于调整组件顺序，同时调整组件层级layer
     * @param index1 当前要交换的组件索引
     * @param index2 目标组件索引
     */
    const swapTwoComponent = (index1: number, index2: number) => {
        //调整元素层级
        const tempLayer = canvas.data[index1].layer
        canvas.data[index1].layer = canvas.data[index2].layer
        canvas.data[index2].layer = tempLayer
        swap(canvas.data, index1, index2)
    }

    //生成置底组件的命令，交与execute()函数处理
    function createCommandSetBottomComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: {
                icon: 'mynaui:chevron-down-square',
                label: '置底组件'
            },
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

    //生成置顶组件的命令，交与execute()函数处理
    function createCommandSetTopComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: {
                icon: 'mynaui:chevron-up-square',
                label: '置顶组件'
            },
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

    //生成锁定组件的命令，交与execute()函数处理
    function createCommandLockComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: {
                icon: 'fluent:lock-closed-24-regular',
                label: '锁定组件'
            },
            execute: () => {
                component.lock = true
            },
            undo: () => {
                component.lock = false
            }
        }
    }

    //生成解锁组件的命令，交与execute()函数处理
    function createCommandUnlockComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: {
                icon: 'fluent:lock-open-24-regular',
                label: '解锁组件'
            },
            execute: () => {
                component.lock = false
            },
            undo: () => {
                component.lock = true
            }
        }
    }

    //生成移动组件的命令，交与execute()函数处理
    function createCommandMoveComponent(component: CommonComponentConfig, oldComponent?: CommonComponentConfig): LowCodeCommand {
        const index = canvas.data.findIndex((item: CommonComponentConfig) => component.id === item.id)
        return {
            component,
            oldComponent,
            index,
            description: {
                icon: 'mynaui:move',
                label: '移动组件'
            },
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
        historyOperation,
        toolBarController,
        historyOperationShow,
        historyOperationIndex,
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
        recoverByHistory,
    }
})