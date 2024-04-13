
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
    currentSelectedComponent: CommonComponentConfig | null,
    oldSelectedComponent: CommonComponentConfig | null,
}