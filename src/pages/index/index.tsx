import React, { useCallback , useEffect } from 'react'
import { FC } from '@defineds/index'
import { View } from '@tarojs/components'
import makeSelectors from '@store/modules/user/make-selector'
import { useSelector } from 'react-redux'
import HomePageSwiper from './components/home-page-swiper'

import './index.scss'

const Index: FC<any> = () => {
  const {
    token,
    isReady,
  } = useSelector(makeSelectors)

  const init = useCallback( async()=>{
    // 等待做初始化操作，比如登录拿到token
    if(!isReady) return
    await isReady
    console.log('token-----',token);
  },[isReady])

  useEffect(()=>{
    init()
  },[init])
  return (
    <View>
      index
      <HomePageSwiper />
    </View>
  )
}
export default Index
