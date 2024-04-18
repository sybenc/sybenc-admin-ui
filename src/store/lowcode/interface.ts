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


type AlignmentLineType = 'vl' | 'vc' | 'vr' | 'ht' | 'hc' | 'hb'
type DistanceLineType = 'lr' | 'rl' | 'tb' | 'bt'

interface Line {
    type: AlignmentLineType
    orientation: Orientation
    top?: string
    left?: string
    show: boolean
}

type AlignmentLine = { [key in AlignmentLineType]: Line }
