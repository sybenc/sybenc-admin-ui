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

type Orientation = 'vertical' | 'horizontal'

interface LowCodeGuideLine {
    orientation: Orientation,
    position: number,
    show: boolean,
}


type LineType = 'vl' | 'vc' | 'vr' | 'ht' | 'hc' | 'hb'

interface Line {
    type: LineType
    orientation: Orientation
    top?: string
    left?: string
    show: boolean
}

type AlignmentLine = { [key in LineType]: Line }
