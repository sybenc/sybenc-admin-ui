type LowCodeGroupName = 'form'
    | 'geometry'
    | 'charts'

interface LowCodeGroupItem {
    label: string,
    name: LowCodeGroupName,
    icon: string
}

interface LowCodeCommonStyle {
    top: string,
    left: string,
    width: string,
    height: string,
}