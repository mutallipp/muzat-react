import type { SyntheticEvent } from 'react'
import type { IPropsBase } from '@defineds/index'

export interface IImageProps extends IPropsBase{
  /**
   * 图片地址
   */
  imgUrl: string,
  /**
   * 图片描述
   */
  alt?: string,
  /**
   * 宽度
   */
  width?: number,
  /**
   * 高度
   */
  height?: number,
  /**
   * 图片质量
   * @default 90
   * */
  quality?: string,
  /**
   * image元素盒属性
   */
  display?: string,
  imgStyle?: Record<string, any> ;
  /**
   * 图片点击回调
   */
  onClick?: (e?: SyntheticEvent) => void,
  /**
   * 图片加载完毕回调
   */
  onLoad?: (e?: SyntheticEvent) => void,
  /**
   * 跳转连接
   */
  link?: string
  /**
   * 是否使用懒加载模式
   */
  isLazyload?: boolean,
  /**
   * 默认图片类型
   */
  defaultImage?: 'star' | 'rectangle' | 'circle'
  /**
   * 设计稿宽度 默认: 375
   */
  desginWidth?: 375,
  /**
   * 图片内容注入,适应swiper内
   */
  imageChildren?: HTMLImageElement
  /**
   * 是否启用压缩图片，默认true
   */
  useZip?: boolean,
  /**
   * 相交率(两屏幕内)
   */
  intersectionRatio?: number;
  /**
   * 水印
   */
  watermark?: string
  /**
   * 瀑布流 测试数据
   */
  isShowProductStyle?:boolean
  /**
   * 是否开启图像渐进式加载
   * */
  isInterlace?:boolean
}
