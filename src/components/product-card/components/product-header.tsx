import React, { useCallback } from 'react'
import type { FC } from '@defineds/index'
import Image from '@components/image-component'

import './style/product-header.scoped.scss'

const ProductHeader: FC<any> = (props: any) => {
  const {productItem } = props
  console.log('ss');

  return (
    <div className='header'>
      <div className='left m-t-10'>
        <div className='avatar'>
        <Image imgUrl={productItem?.memberInfo?.avatar} width={35} height={35} />
        </div>
      </div>
      <div className='right'>right</div>
    </div>
  )
}
export default ProductHeader
