/**
 * Input组件属性值控制接口
 */
interface LowCodeInputPropsValue {
    id: string,
    type: string,
    label?: string,
    placeholder?: string
}

/**
 * Input组件的样式控制接口
 */
interface LowCodeInputStyle extends LowCodeCommonStyle {

}

/**
 * Input组件数据控制接口
 */
interface LowCodeInputComponent extends CommonComponentConfig {
    propsValue: LowCodeInputPropsValue
    style: LowCodeInputStyle
}
