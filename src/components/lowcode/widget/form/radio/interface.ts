interface LowCodeRadioPropsValue {
    id: string[],
    label: string[],
    value: string[],
}

interface LowCodeRadioStyle extends LowCodeCommonStyle {

}

interface LowCodeRadioComponent extends CommonComponentConfig {
    propsValue: LowCodeRadioPropsValue
    style: LowCodeRadioStyle
}