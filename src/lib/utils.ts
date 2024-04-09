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
export default function generateID() {
    return nanoid()
}