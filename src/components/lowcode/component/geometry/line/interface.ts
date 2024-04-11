/**
 * Line组件属性值控制接口
 */
interface LowCodeLinePropsValue {
}

/**
 * Line组件的样式控制接口
 */
interface LowCodeLineStyle extends CommonComponentStyle {
    'border-bottom': string
}

/**
 * Line组件数据控制接口
 */
interface LowCodeLineComponent extends CommonComponentConfig {
    propsValue: LowCodeLinePropsValue
    style: LowCodeLineStyle
}
