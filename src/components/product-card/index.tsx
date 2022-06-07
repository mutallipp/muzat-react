import React, { useMemo } from 'react'
import { WhiteSpace, Card } from 'antd-mobile'
// import {Image } from '@tarojs/components'
import Image from '@components/image-component'
import type { FC } from '@defineds/index'
import ProductHeader from './components/product-header'
import { IProductCardProps } from './types'

import './style/index.scoped.scss'

const ProductCard: FC<IProductCardProps> = (props: IProductCardProps) => {
  const {productItem } = props
  const defaultImg = 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png'

  const renderContent =useMemo(()=>{
    return (
      <div className='content'>content</div>
    )
  },[])
  const renderFooter =useMemo(()=>{
    return (
      <div className='footer'>footer</div>
    )
  },[])

  return (
    <div className='product-card-cantainer bg-white'>
      <ProductHeader productItem={productItem} />
      {renderContent}
      {renderFooter}
    </div>
  )
}
export default ProductCard
