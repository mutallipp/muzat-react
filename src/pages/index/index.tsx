import React, { useCallback , useEffect , useMemo } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { WhiteSpace } from 'antd-mobile'
import { FC } from '@defineds/index'
import { View } from '@tarojs/components'
import Category from '@components/category'
import ProductCard from '@components/product-card'
import HomePageSwiper from './components/home-page-swiper'
import makeSelectHomePage from './reducer/make-selector'

import './index.scss'
import homePageActions from './reducer/actions'

const Index: FC<any> = () => {
  const {
    swiperImgList,
    categoryList,
    productList,
  } = useSelector(makeSelectHomePage)

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
    <View className='page-container'>
      <HomePageSwiper swiperImgList={swiperImgList} />
      <Category categoryList={categoryList} style={{marginTop:'12px'}} />
      {productList.map(item=>(
        <div key={item.id}>
        <WhiteSpace  size='lg' />
        <ProductCard  productItem={item} />
        </div>
      ))}
    </View>
  )
}
definePageConfig({
  navigationBarTitleText:'muzat信息平台'
})
export default Index
