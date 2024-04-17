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

interface LowCodeRuler {
    length: number,
    width: number,
    scale: string,
    scaleCenter: number[],
    show: boolean,
    guideLineV: LowCodeGuideLine[]
    guideLineH: LowCodeGuideLine[]
}

type LineType = 'vl' | 'vc' | 'vr' | 'ht' | 'hc' | 'hb'
