import React, { useCallback , useEffect } from 'react'
import { FC } from '@defineds/index'
import { View } from '@tarojs/components'
// import makeSelectors from '@store/modules/user/make-selector'
import { useDispatch } from 'react-redux'
import HomePageSwiper from './components/home-page-swiper'

import './index.scss'
import homePageActions from './reducer/actions'

const Index: FC<any> = () => {
  // const {
  //   token,
  //   isReady,
  // } = useSelector(makeSelectors)

  const dispatch = useDispatch()

  const init = useCallback( async()=>{
    // 等待做初始化操作，比如登录拿到token
    // if(!isReady) return
    // await isReady
    await dispatch(homePageActions.GET_HOME_PAGE_DATA())
  },[])

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
