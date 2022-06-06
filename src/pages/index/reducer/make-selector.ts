import { createStructuredSelector } from 'reselect'
import {
  makeSelectSwiperImgList,
} from './selector'

const makeSelectors = createStructuredSelector({
  /**
   * 首页轮播图
   * */
   swiperImgList: makeSelectSwiperImgList(),
})

export default makeSelectors

