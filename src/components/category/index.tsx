import React, { useCallback } from 'react'
import { Button,Tabs,Badge } from 'antd-mobile'
import { View } from '@tarojs/components'
import type { FC } from '@defineds/index'

import './index.scss'
import { ICategoryProps } from './types'

const Category: FC<ICategoryProps> = (props: ICategoryProps) => {
  const {
    categoryList
  } = props
  const tabs1_1 = [
    { title: <Badge text='3'>First Tab</Badge> },
    { title: <Badge text='今日(20)'>Second Tab</Badge> },
    { title: <Badge dot>Third Tab</Badge> },
  ]
  return (
    <View>
      Category
      {/* <Button type='warning'>warning</Button> */}
      <Tabs tabs={tabs1_1}
        initialPage={1}
        onChange={(tab, index) => { console.log('onChange', index, tab) }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab) }}
      >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of first tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of second tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of third tab
      </div>
    </Tabs>
    </View>
  )
}
export default Category
