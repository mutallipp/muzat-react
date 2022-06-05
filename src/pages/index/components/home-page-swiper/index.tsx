import React, { useCallback } from 'react'
import type { FC } from '@defineds/index'
import { Swiper, SwiperItem,Image } from '@tarojs/components'

import './index.scss'

const HomePageSwiper: FC<any> = (props: any) => {
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
      {bannerList.map(item => (
        <SwiperItem key={item} className=''>
          <Image src={item} className='banner-list-item-img' />
          {/* banner-{item} */}
        </SwiperItem>
      ))}
    </Swiper>
  )
}
export default HomePageSwiper
