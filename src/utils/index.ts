import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";

import qs from 'qs'
import { IAnyObj } from '@/defineds'
import { ActualTypeElementType, FilterNullable, StringToType } from './types/index'

/**
 * 获取元素大概类型(时间、正则等对象视为object类型)
 * @param {element} element
 */
export function getElementType (element: any): string {
  const type = new Map([
    ['[object String]', 'string'],
    ['[object Number]', 'number'],
    ['[object Boolean]', 'boolean'],
    ['[object Null]', 'null'],
    ['[object Undefined]', 'undefined'],
    ['[object Symbol]', 'symbol'],
    ['[object Bigint]', 'bigint'],
    ['[object Function]', 'function'],
    ['[object Array]', 'array'],
    ['[object Object]', 'object'],
    ['[object Map]', 'map'],
    ['[object Set]', 'set'],
    ['[object Date]', 'object'],
    ['[object RegExp]', 'object'],
    ['[object Error]', 'object'],
    ['[object Math]', 'object'],
    ['[object JSON]', 'object'],
  ])
  const elementType = type.get(Object.prototype.toString.call(element))
  if (!elementType) {
    console.warn('没有找到元素类型，请完善getElementType')
    return ''
  }
  return elementType
}
/**
 * 获取元素实际类型
 * @param {Any} element
 */
export function getElementActualType (element: any): string {
  const type = new Map([
    ['[object String]', 'string'],
    ['[object Number]', 'number'],
    ['[object Boolean]', 'boolean'],
    ['[object Null]', 'null'],
    ['[object Undefined]', 'undefined'],
    ['[object Symbol]', 'symbol'],
    ['[object Bigint]', 'bigint'],
    ['[object Function]', 'function'],
    ['[object Array]', 'array'],
    ['[object Object]', 'object'],
    ['[object Map]', 'Map'],
    ['[object Set]', 'set'],
    ['[object Date]', 'date'],
    ['[object RegExp]', 'regexp'],
    ['[object Error]', 'error'],
    ['[object Math]', 'math'],
    ['[object JSON]', 'json'],
    ['[object FormData]', 'formData'],
  ])
  const elementType = type.get(Object.prototype.toString.call(element))
  if (!elementType) {
    console.warn('没有找到元素类型，请完善getElementType')
    return ''
  }
  return elementType
}
/**
/**
 * 判断元素的真实类型与传入的值是否相等
 * 该函数相较于getElementActualType增加了类型保护
 * 用法: if (actualTypeIsEqual(time, 'date')) { console.log('time是Date类型') }
 * @param {element} element
 * @param type 要判断的类型
 * @returns boolean
 */
export function actualTypeIsEqual<T extends ActualTypeElementType> (element:any, type:T):element is StringToType<T> {
  return getElementActualType(element) === type
}
/**
 * 过滤对象的空值
 * @param {Object}
 * @return {Object}
 */
export function pick (obj: FilterNullable<IAnyObj> = {}) {
  if (getElementType(obj) !== 'object') return obj
  const newParams = {} as FilterNullable<IAnyObj>
  for (const [key, value] of Object.entries(obj)) {
    if (obj[key] != null) {
      newParams[key] = value
    }
  }
  return newParams
}
type toastType = 'error' | 'success' | 'loading' | 'none'

/**
 * toast提示框
 */
export const toast = (
  msg: string,
  type: toastType = 'none',
  option: IAnyObj = {},
)=>{
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showToast] = useToast({ mask: true });
  showToast({ title:msg });

}
/**
 * 睡眠函数
 * @param wait 睡眠时间
 */
export function sleep (wait = 500):Promise<void> {
  return new Promise(resolve => setTimeout(resolve, wait))
}

/**
 * 防抖
 */
export function debounce<T extends (...args: any) => any>(fun: T, wait = 500, immediately = true): T | ((...args: Parameters<T>) => void) {
  let timer: NodeJS.Timeout | null = null
  // eslint-disable-next-line func-names
  return function (...rest: any[]) {
    if (timer) {
      // console.log(`函数${fun.name}处于防抖时间中，${wait}ms后可再次执行`)
      clearTimeout(timer)
    }

    if (immediately) {
      // 立即执行版本
      if (!timer) {
        fun.apply(this, rest)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      // 非立即执行版本
      timer = setTimeout(() => {
        fun.apply(this, rest)
        timer = null
      }, wait)
    }
  }
}
/**
 * 截流
 */
export function throttle<T extends (...arg:any)=> any>(fun:T, wait:500):T|((...arg:Parameters<T>)=>void) {
  let timer = 0
  // eslint-disable-next-line func-names
  return function (...rest:any[]) {
    let result
    const now = (new Date()).valueOf()
    const diff = now - timer
    if (diff > wait) {
      result = fun.apply(this, rest)
      timer = now
    } else {
      console.log(`函数${fun.name}处于节流时间中，${wait - diff}ms后可再次执行`)
    }
    return result
  }
}
/**
 * 获取uuid
 */
export function getUUID ():string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.floor(Math.random() * 16)
    const v = c === 'x' ? r : (r && 0x3) || 0x8
    return v.toString(16)
  })
}
/**
 * 根据search计算query
 */
export function getQuery (search:string):IAnyObj {
  if ((search || '')?.startsWith('?')) {
    const queryObj = qs.parse(search.slice(1, search.length))
    return queryObj
  } else {
    return {}
  }
}
/** px转换vw
 * @param {number} px
 * @param {number} designWidth
 * @return {stirng}
 */
export function pxTovw (px:number|string, designWidth = 375): string {
  const numPx = Number(px)
  if (!px || Number.isNaN(numPx)) return '0'
  return `${Number(px) / designWidth * 100}vw`
}

/**
 * @param str 输入的字符串，返回当前字符串的长度
 * @returns
 */
export function sizeOf (str: string) {
  let code: number
  let len = 0
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i)
    if (code === 10) {
      // 回车换行问题
      len += 2
    } else if (code < 0x007f) {
      len += 1
    } else if (code >= 0x0080 && code <= 0x07ff) {
      len += 2
    } else if (code >= 0x0800 && code <= 0xffff) {
      len += 3
    }
  }
  return len
}
/**
 * 立即执行的callback异步函数转promise异步函数
 */
export function immediatelyPromisify<T extends (...args: any) => any>(fun: T, newThis: any, ...rest: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    fun.apply(newThis, [...rest, (err:any, res:any) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    }])
  })
}
/**
 * 生成className前缀
 */
export function getPrefixCls (suffixCls?: string, customizePrefixCls?: string) {
  const globalPrefixCls = 'mutallip'
  if (customizePrefixCls) return customizePrefixCls
  return suffixCls ? `${globalPrefixCls}-${suffixCls}` : `${globalPrefixCls}`
}

/**
 * 时间戳转换时间
 */
export const timeStamp2time = (timeStp:Date):string => {
  const date = new Date(timeStp) // 获取一个时间对象

  const Y = `${date.getFullYear()}`
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`
  const D = `${date.getDate()} `
  const h = `${date.getHours() + 1 < 10 ? `0${date.getHours()}` : date.getHours()}`
  const m = `${date.getMinutes() + 1 < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
  const s = date.getSeconds()
  return `${Y}/${M}/${D} ${h}:${m}:${s}`
}
// 获取当前页面path
export const getPageUrl = (lev:number):string => {
  if (lev > 0) return ''
  const pages = getCurrentPages()
  const page = pages[pages.length - Math.abs(lev) - 1]
  const pageUrl = `/${page.route}`
  return pageUrl
}

