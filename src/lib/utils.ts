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

// 深拷贝
export function deepCopy<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
        // 如果是基本类型或 null，则直接返回
        return obj;
    }

    // 如果是数组，则创建一个新数组并递归复制每个元素
    if (Array.isArray(obj)) {
        const newArray: any[] = [];
        for (const item of obj) {
            newArray.push(deepCopy(item));
        }
        return newArray as T;
    }

    // 如果是对象，则创建一个新对象并递归复制每个属性
    const newObj: Record<string, any> = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = deepCopy(obj[key]);
        }
    }
    return newObj as T;
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

export function diff(oldObj: any, newObj: any): boolean {
    // 检查新对象中新增的属性或者值不同的属性
    for (const key in newObj) {
        if (Object.prototype.hasOwnProperty.call(newObj, key)) {
            if (!Object.prototype.hasOwnProperty.call(oldObj, key)) {
                return false; // 新增的属性
            } else if (oldObj[key] !== newObj[key]) {
                return false; // 值不同的属性
            }
        }
    }

    // 检查旧对象中被删除的属性
    for (const key in oldObj) {
        if (Object.prototype.hasOwnProperty.call(oldObj, key) && !Object.prototype.hasOwnProperty.call(newObj, key)) {
            return false; // 被删除的属性
        }
    }

    return true; // 没有差异
}
