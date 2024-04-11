interface LowCodeRadioPropsValue {
    id: string[],
    label: string[],
    value: string[],
}

interface LowCodeRadioStyle extends CommonComponentStyle {

}

interface LowCodeRadioComponent extends CommonComponentConfig {
    propsValue: LowCodeRadioPropsValue
    style: LowCodeRadioStyle
}