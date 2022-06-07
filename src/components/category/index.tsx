import React, { useCallback , useMemo } from 'react'
import { Grid, Button } from 'antd-mobile'
import { View,Image } from '@tarojs/components'
import type { FC } from '@defineds/index'
import { ICategoryItem } from '@/api/IHome/types'
import { ICategoryProps } from './types'

import './index.scss'

const Category: FC<ICategoryProps> = (props: ICategoryProps) => {
  const {
    categoryList,
    style
  } = props
  const data1 = Array.from(new Array(9)).map(() => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
  }))
  const dataSource = useMemo(()=>{
    return categoryList.map(item=>{
      return {
        ...item,
        icon:'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
      }
    })
  },[categoryList])
  const handleClick = useCallback((dataItem:ICategoryItem)=>{
    console.log(dataItem)

  },[])
  return (
    <div style={style}>
    <Grid data={dataSource}
      columnNum={4}
      hasLine={false}
      square={false}
      renderItem={(dataItem:ICategoryItem) => (
        <div style={{ padding: '12.5px' }} onClick={()=>handleClick(dataItem)}>
          <Image src={dataItem.icon} style={{ width: '75px', height: '75px' }} />
          <div style={{ color: '#888', fontSize: '14px', marginTop: '8px' }}>
            <span>{dataItem?.name}</span>
          </div>
        </div>
      )}
    />
    </div>
  )
}
export default Category
