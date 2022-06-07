import React, { useCallback } from 'react'
import type { FC } from '@defineds/index'
import { Swiper, SwiperItem,Image } from '@tarojs/components'

import './index.scss'
import { IHomePageSwiperProps } from './types'

const HomePageSwiper: FC<IHomePageSwiperProps> = (props: IHomePageSwiperProps) => {
  const {
    swiperImgList = []
  } = props
  const bannerList = new Array(5).fill('http://qiniu.mutallip.cn/b6d30d14aaa3461982c581b5e79f4bb4.png')

  return (
    <Swiper
      className='banner-list'
      indicatorColor='#999'
      indicatorActiveColor='#d43c33'
      circular
      indicatorDots
      autoplay
    >
      {swiperImgList.map((item,index) => (
        <SwiperItem key={item.id+index} className=''>
          <Image src={item.imgUrl} className='banner-list-item-img' mode='aspectFill' />
          {/* banner-{item} */}
        </SwiperItem>
      ))}
    </Swiper>
  )
}

export default HomePageSwiper
