import type { FunctionComponent,ReactNode } from 'react'

/**
 * 任意的函数
 */
 export type IAnyFn = (...args: any[]) => any
 /**
 * 函数式组件基础类型(所有函数式组件的props参数都继承IPropsBase)
 */
export interface IPropsBase {
  // 路由等属性稍后定义
  // history
  children?: ReactNode;
  // 状态
  store?: any
  // 路由配置项
  route?: any,
}
 /**
 * 函数式组件类型
 */
export type FC<P extends IPropsBase = IPropsBase> = IMyFunctionComponent<P>
 /**
 * 函数式组件类型
 */
export interface IMyFunctionComponent<P> extends FunctionComponent<P> {
  /**
   * 是否已执行过onLoad
   */
  isRunOnLoad?: boolean,
}
