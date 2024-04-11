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
    top: string,
    left: string,
    width: string,
    height: string,
}

interface Snapshot {
    canvasData: CommonComponentConfig[],
    canvasCurrentSelected: CommonComponentConfig | null,
    currentGroupName: LowCodeGroupName,
    scaleShow: boolean,
    description: string,
}

interface LowCodeGroupItem {
    label: string,
    name: LowCodeGroupName,
    icon: string
}