import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import { nanoid } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// 根据传递的对象数据生成HTML标签style的属性值
export function generateLowCodeStyle(style: LowCodeInputStyle | undefined): string {
    let styleAttr = ''
    if (style) {
        for (const [key, value] of Object.entries(style)) {
            styleAttr += `${key}: ${value};`
        }
    }
    return styleAttr
}

// 深拷贝去除响应式
export function deepCopy(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const clonedObj: any = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clonedObj[key] = deepCopy(obj[key]);
        }
    }
    return clonedObj;
}
// 主要用于 Vue 的 diff 算法，为每个元素创建一个独一无二的 ID
export function generateID() {
    return nanoid()
}

/**
 * 交换数组中的两个元素
 * @param array 要交换的数组
 * @param index1 索引1的位置
 * @param index2 索引2的位置
 */
export function swap<T>(array: T[], index1: number, index2: number): void {
    if (index1 < 0 || index1 >= array.length || index2 < 0 || index2 >= array.length) {
        throw new Error('Index out of bounds')
    }
    const temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
}