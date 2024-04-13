/**
 * Input组件属性值控制接口
 */
interface LowCodeInputPropsValue {
    id: string,
    type: string,
    label: string,
    labelShow: boolean,
    placeholder: string,
    placeholderShow: boolean,
    display: string,
}

/**
 * Input组件的样式控制接口
 */
interface LowCodeInputStyle extends CommonComponentStyle {
    gap: string,
    // label: {
    //     width: string,
    //     //字体相关属性
    //     color: string,
    //     fontFamily: string,
    //     fontSize: string,
    //     fontWeight: string,
    //     fontStyle: string,
    //     fontVariant: string
    //     lineHeight: string,
    //     letterSpacing: string,
    //     textShadowH: string,
    //     textShadowV: string,
    //     textShadowBlur: string,
    //     textShadowColor: string
    // },
    // inputBox: {
    //     // 字体相关属性
    //     color: string,
    //     fontSize: string,
    //     fontWeight: string,
    //     fontStyle: string,
    //     fontVariant: string,
    //     letterSpacing: string,
    //     // 边框相关属性
    //     borderWidth: string,
    //     borderColor: string,
    //     borderStyle: string,
    //     borderRadius: string,
    //     outlineWidth: string,
    //     outlineColor: string,
    //     outlineStyle: string,
    //     // 阴影相关属性
    //     boxShadowX: string,
    //     boxShadowY: string,
    //     boxShadowBlur: string,
    //     boxShadowSpread: string,
    //     boxShadowColor: string,
    //     boxShadowInset: string,
    //     // 动画相关属性
    //     animationDuration: string,
    //     animationDelay: string,
    //     animationTimingFunction: string, // 指定动画的时间函数
    //     animationDirection: string, // 用于设置动画播放的方向
    //     animationFillMode: string, // 用于设置动画在非执行时间段的样式
    //     animationIterationCount: string // 用于设置动画的播放次数
    // }
}

/**
 * Input组件数据控制接口
 */
interface LowCodeInputComponent extends CommonComponentConfig {
    propsValue: LowCodeInputPropsValue
    style: LowCodeInputStyle
}
