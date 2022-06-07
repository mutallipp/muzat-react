import React, { useCallback } from 'react'
import type { FC } from '@defineds/index'

import './index.scss'
import { ICategoryProps } from './types'

const Category: FC<ICategoryProps> = (props: ICategoryProps) => {
  const {
    categoryList
  } = props
  return (
    <div>Category</div>
  )
}
export default Category
