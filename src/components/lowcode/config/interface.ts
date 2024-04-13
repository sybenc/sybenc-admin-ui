type LowCodeGroupName = 'form'
    | 'geometry'
    | 'charts'

interface CommonComponentConfig {
    id: string, // 唯一标识
    component: string, // vue注册的组件名
    layer: number, // 元素的层级顺序
    lock: boolean, // 元素是否锁定
    group: LowCodeGroupName, // 组件所在的组名
    label?: string, // 显示在预设组件列表的标签
    icon?: string, // 显示在预设组件列表的图标
    animations: [], // 组件的动画列表
    events: { [key: string]: any }, // 组件的事件列表
    propsValue: any, // 组件的属性集合，子接口会重写该属性
    style: any // 组件的样式集合，子接口会重写该属性
}

interface CommonComponentStyle {
    //位置
    top: string,
    left: string,
    //长宽
    width: string,
    height: string,
    //旋转角度
    rotate: string,
    //不透明度
    opacity: string,
}

interface LowCodeGroupItem {
    label: string,
    name: LowCodeGroupName,
    icon: string
}