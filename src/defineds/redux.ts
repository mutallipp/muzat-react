import type { IAnyFn } from '@defineds/index'

type ReturnTypes<EnumTypes> = {
  [key in keyof EnumTypes]: key
}

export function createTypes<EnumTypes> (enumTypes: EnumTypes): ReturnTypes<EnumTypes> {
  return Object.entries(enumTypes as any).reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}) as ReturnTypes<EnumTypes>
}
/**
 * 同步状态动作返回值
 */
 interface ISyncActionReturn {
  /**
   * action类型
   */
  type: string,
  /**
   * action相关参数
   */
  payload?: any,
}
/**
 * 异步状态动作返回值
 */
 type IAsyncActionReturn = IAnyFn
/**
 * 状态动作返回值
 */
 type IActionReturn = ISyncActionReturn | IAsyncActionReturn
/**
 * 状态动作
 */
 type ActionValue = (...args: Array<any>) => IActionReturn
/**
 * 状态动作对象
 */
 interface IActions {
  [propname: string]: ActionValue,
}
/**
 * 过滤异步状态动作返回值
 */
 type filterAsyncActionReturn<T extends IActionReturn, K> = T extends ISyncActionReturn ? T : (
  T extends IAsyncActionReturn ? (
    K extends string ? {
      type: K,
      payload?: any,
    } : never
  ) : never
)
/**
 * 获取状态动作联合类型
 */
 type getReturnType<T extends IActions> = {
  [K in keyof T]: T[K] extends (...args: Array<any>) => infer ReturnType ? (
    ReturnType extends IActionReturn ? filterAsyncActionReturn<ReturnType, K> : never
  ) : never
}[keyof T]
/**
 * 获取状态动作联合类型
 */
 export function getActionsReturnType<T extends IActions, K> (appActions: T) {
  const res = {} as unknown as getReturnType<T>
  return res
}
