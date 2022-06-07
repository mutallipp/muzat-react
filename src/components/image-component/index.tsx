import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  useCallback,
  CSSProperties,
} from 'react'
import type { SyntheticEvent } from 'react'
import type { FC } from '@defineds/index'
import * as utils from '@utils/index'
import { DESGIN_WIDTH } from '@/utils/constants'
// import { useClientRect } from '@/hooks/client-rect'

import type { IImageProps } from './types/index'


import './style/index.scss'

const Image: FC<IImageProps> = (props: IImageProps) => {

  const {
    /**
     * 图片地址
     */
    imgUrl,
    /**
     * 图片描述(原生alt属性)
     */
    alt,
    /**
     * 宽度(设计稿的尺寸)
     */
    width,
    /**
     * 高度(设计稿的尺寸)
     */
    height,
    /**
     * 图片质量
     * */
    quality = '60',
    /**
     * 元素盒子类型属性(原生display属性)
     */
    display,
    imgStyle = {},
    /**
     * 图片点击回调
     */
    onClick,
    /**
     * 图片加载完毕回调
     */
    onLoad,
    /**
     * 点击图片的跳转链接
     */
    link,
    /**
     * 是否使用懒加载模式
     */
    isLazyload = true,
    /**
     * 默认图片类型
     * 默认显示star，可选rectangle
     */
    defaultImage = 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
    /**
     * 设计稿宽度
     */
    desginWidth = DESGIN_WIDTH,
    /**
     * 是否启用压缩图片
     */
    useZip = true,
    /**
     * 子元素
     * */
    children,
    /**
     * 相交率(两屏幕内)
     */
    intersectionRatio = 2,
    /**
     * 水印
     */
    watermark,
    /**
     * 瀑布流  测试
     */
    isShowProductStyle,
    /**
     * 是否开启渐进式图像加载
     * @default false
     * */
    isInterlace,
  } = props

  // 所有占位元素


  /**
   * 默认占位元素
   */
  const imagePlaceholder = useMemo(() => {
    return  (
      <img src={defaultImage} alt='default' style={{ width: '100%', height: '100%' }} />
    )
  }, [ defaultImage])
  /**
   * 样式
   */
  const aspectratioStyle: CSSProperties = useMemo(() => {
    let style = {}
    if (!isShowProductStyle) {
      style = { overflow: 'hidden' }
    }
    if (display) {
      Object.assign(style, {
        display,
      })
    }
    if (width && height) {
      return Object.assign(style, {
        ...imgStyle,
        height: utils.pxTovw(height, desginWidth),
        width: utils.pxTovw(width, desginWidth),
        // height: height,
        // width: width,
      })
    }
    return style
  }, [width, height, desginWidth, display, imgStyle])

  /**
   * 图片点击回调
   */
  const clickHandler = useCallback((e: SyntheticEvent): void => {
    // if (link) utils.routerLink(link)
    onClick?.(e)
  }, [onClick, link])

  /**
   * 图片元素
   */
  const imageElement = useRef<null | HTMLImageElement>(null)

  /**
   * 图片是否处于视窗内
   */
  const [imageInTheWindow, setImageInTheWindow] = useState<boolean>(false)

  /**
   * 图片是否加载完成
   */
  const [loaded, setLoaded] = useState(false)

  /**
   * 图片是否加载完成promise格式
   */
  const loadedPromise = useRef<{ loaded: Promise<boolean>, r: any }>(null)

  /**
   * 是否展示骨架屏
   */
  const showModal = useMemo(() => {
    if (!isLazyload) return false
    return !loaded
  }, [isLazyload, loaded])

  /**
   * 是否展示图像区域
   * */
  const showImage = useMemo(() => {
    if (!isLazyload || isInterlace) return false
    return !loaded
  }, [isLazyload, loaded, isInterlace])

  /**
   * 图片加载完毕的回调
   */
  const imgOnLoad = useCallback(() => {
    loadedPromise.current?.r?.()
    setLoaded(true)
    onLoad?.()
  }, [onLoad])

  /**
   * 判断图片是否处于视窗内(渲染两屏内的图片)
   * @returns 图片是否处于视窗之内
   */
  const lazyload = useCallback((id?: string, scrollType?: string, scrollEvent?: Event, newIntersectionRatio?: number): { isInTheWindow: boolean } => {
    if (process.env.__SERVER__ === 'true') return
    if (imageInTheWindow) return
      setImageInTheWindow(true)
      return{
        isInTheWindow: true,
      }
    // const { clientHeight, clientWidth } = document.body

    const { clientHeight=737, clientWidth=327 } = {}
    // const clientRect = useClientRect('image-box')
    // console.log('imageElement',clientRect);

    const rect = imageElement.current?.getBoundingClientRect?.()
    if (!rect) return
    if (rect.top === 0 && rect.right === 0 && rect.bottom === 0 && rect.left === 0) return

    const currentIntersectionRatio = newIntersectionRatio || intersectionRatio

    if (
      rect.top >= (0 - rect.height - clientHeight * (currentIntersectionRatio - 1)) && rect.top < clientHeight * currentIntersectionRatio
      && rect.left > (0 - rect.width - clientWidth * (currentIntersectionRatio - 1)) && rect.left < (clientWidth * currentIntersectionRatio)
    ) {
      setImageInTheWindow(true)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      // id && removeScrollSubscribe(id)
      return {
        isInTheWindow: true,
      }
    }
    return {
      isInTheWindow: false,
    }
  }, [imageInTheWindow, intersectionRatio])

  // const {
  //   addScrollSubscribe,
  //   removeScrollSubscribe,
  //   notifyScrollSubscribe,
  // } = useScrollSubscribe(lazyload)

  /**
   * 初始化
   */
  const init = useCallback(() => {
    // if (isLazyload && !loaded) {
    //   addScrollSubscribe()
    //   setTimeout(notifyScrollSubscribe, 0)
    // }

  }, [isLazyload, loaded])

  const reloadImage = useRef(async() => {

    // 初始化数据
    let r
    const p: Promise<boolean> = new Promise(resolve => r = resolve)
    loadedPromise.current = {
      loaded: p,
      r,
    }
    setImageInTheWindow(false)
    setLoaded(false)

      // 页面未加载完成前，所有任务注册到pageOnLoadTaskQueue中，统一执行

        const {
          isInTheWindow,
        } = lazyload(undefined, undefined, undefined, 1) || {}
        if (isInTheWindow) {
          // 图片处在视窗之内
          await loadedPromise.current.loaded
        } else {
          // 图片不在视窗之内，延迟到window.onload之后执行
          setTimeout(()=>{
            init()
          },2*1000)
        }
  })

  useMemo(() => {
    reloadImage.current()
  }, [imgUrl])

  /**
   * 添加图片压缩格式后的图片地址
   */
  const zipImgUrl = useMemo((): string => {
    // if (!useZip) return imgUrl
    // return imgZip(imgUrl, width, {
    //   quality,
    //   interlace: isInterlace,
    // })
    return imgUrl
  }, [imgUrl, width, useZip, quality, isInterlace])
  return (
    <div
      className='aspectratio'
      style={aspectratioStyle}
    >
      <div className='image-box' onClick={clickHandler} ref={imageElement}>
        {/* 展示占位 */}
        {showModal ? (<div className='img'>{imagePlaceholder}</div>) : null}

        {/* 图像 */}
        {(!isLazyload || imageInTheWindow) && (
          <>
            <img
              className='image-inner'
              src={zipImgUrl}
              alt={alt}
              onLoad={imgOnLoad}
              onError={imgOnLoad}
              style={{ width: showImage ? '0' : '100%', height: showImage ? '0' : '100%', transform: isShowProductStyle === undefined ? '' : isShowProductStyle ? '' : 'scale(1.1)' }}
            />
          </>
        )}

        {/* 水印 */}
        {watermark && <img className='watermark' src={watermark} alt='' />}
      </div>
      {children || null}
    </div>
  )
}

export default Image
