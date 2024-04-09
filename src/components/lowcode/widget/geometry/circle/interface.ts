/**
 * Circle组件属性值控制接口
 */
interface LowCodeCirclePropsValue {}

/**
 * Circle组件的样式控制接口
 */
interface LowCodeCircleStyle extends LowCodeCommonStyle {
    'border-radius': string,
    border: string
}

/**
 * Circle组件数据控制接口
 */
interface LowCodeCircleComponent extends CommonComponentConfig {
    propsValue: LowCodeCirclePropsValue
    style: LowCodeCircleStyle
}
