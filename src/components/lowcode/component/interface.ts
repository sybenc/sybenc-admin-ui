type LowCodeGroupName = 'form'
    | 'geometry'
    | 'charts'

interface LowCodeGroupItem {
    label: string,
    name: LowCodeGroupName,
    icon: string
}
