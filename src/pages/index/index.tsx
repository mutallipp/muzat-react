import React, { useCallback , useEffect } from 'react'
import { FC } from '@defineds/index'
import { View } from '@tarojs/components'
import rest from '@/api/rest'
import HomePageSwiper from './components/home-page-swiper'

import './index.scss'

const Index: FC<any> = (props: any) => {
  const getData = async () =>{
    const {code,msg,data} = await rest.request<any>('/api/mina/member/login')
    console.log(code,msg,data);

  }
  getData()
  // useEffect(()=>{
  //   getData()
  // },[])
  return (
    <View>
      index
      <HomePageSwiper />
    </View>
  )
}
export default Index
