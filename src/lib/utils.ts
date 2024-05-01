import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {nanoid} from 'nanoid'
import {Updater} from "@tanstack/vue-table";
import {Ref} from "vue";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * The valueUpdater function updates a Vue ref object's value.
 * It handles both direct assignments and transformations using a function.
 * If updaterOrValue is a function, it's called with the current ref value,
 * and the result is assigned to ref.value. If it's not a function,
 * it's directly assigned to ref.value. This utility enhances flexibility in updating ref values.
 * While Vue ref can manage reactive state directly, valueUpdater simplifies value updates,
 * improving code readability and maintainability when the new state can be a direct value or a function generating it based on the current one.
 * @param updaterOrValue
 * @param ref
 */
export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
    ref.value
        = typeof updaterOrValue === 'function'
        ? updaterOrValue(ref.value)
        : updaterOrValue
}

// 根据传递的对象数据生成HTML标签style的属性值
export function generateLowCodeStyle(style: LowCodeInputStyle | undefined): string {
    let styleAttr = ''
    if (style) {
        for (const [key, value] of Object.entries(style)) {
            if (typeof value !== 'object') {
                switch (key) {
                    case 'rotate':
                        styleAttr += `transform: rotate(${value});`
                        break
                    default:
                        styleAttr += `${key}: ${value};`
                        break
                }
            }
        }
    }
    return styleAttr
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

export function separateNumberAndUnit(input: string): [number | null, string | null] {
    // 定义正则表达式匹配数字和单位
    const regex = /^(\d*\.?\d+)\s*([a-zA-Z]+)$/;

    // 匹配输入字符串
    const match = input.match(regex);

    if (match) {
        // 如果匹配成功，则返回数字和单位的数组
        const number = parseFloat(match[1]);
        const unit = match[2];
        return [number, unit];
    } else {
        // 如果没有匹配成功，则返回 null
        return [null, null];
    }
}
