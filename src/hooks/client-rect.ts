import Taro from '@tarojs/taro'
import React, { useMemo, useState } from 'react'

/**
 * @param selector {string} 元素选择器
 * @description 获取元素宽高等
 */
export const useClientRect = (selector: string) => {

  const [clientRect,setClientRect ] = useState({})

  useMemo(()=>{
      const info = Taro.createSelectorQuery().select(selector)
      info
        .boundingClientRect((data) => {
          // data - 各种参数
          // clientRect.value = data
          console.log(data);

          setClientRect(data)
        })
        .exec()
  },[])


  return clientRect
}
