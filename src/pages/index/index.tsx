import React, { useCallback , useEffect } from 'react'
import { FC } from '@defineds/index'
import { View } from '@tarojs/components'
import makeSelectors from '@store/modules/user/make-selector'
import { useSelector } from 'react-redux'
import HomePageSwiper from './components/home-page-swiper'

import './index.scss'

const Index: FC<any> = (props: any) => {
  const {
    token
  } = useSelector(makeSelectors)

  useEffect(()=>{
    // getData()
    console.log('token-----',token);

  },[token])
  return (
    <View>
      index
      <HomePageSwiper />
    </View>
  )
}
export default Index
