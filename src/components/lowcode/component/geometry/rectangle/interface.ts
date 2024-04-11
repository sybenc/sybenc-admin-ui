/**
 * Rectangle组件属性值控制接口
 */
interface LowCodeRectanglePropsValue {}

/**
 * Rectangle组件的样式控制接口
 */
interface LowCodeRectangleStyle extends CommonComponentStyle {
    border: string
}

/**
 * Rectangle组件数据控制接口
 */
interface LowCodeRectangleComponent extends CommonComponentConfig {
    propsValue: LowCodeRectanglePropsValue
    style: LowCodeRectangleStyle
}
