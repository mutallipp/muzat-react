import { createStructuredSelector } from 'reselect'
import {
  makeSelectSwiperImgList,
  makeSelectCategoriesList,
  makeSelectProductList,
} from './selector'

const makeSelectors = createStructuredSelector({
  /**
   * 首页轮播图
   * */
   swiperImgList: makeSelectSwiperImgList(),
   /**
    * 首页类目
    */
   categoryList: makeSelectCategoriesList(),
   /**
    * 首页商品
    */
   productList: makeSelectProductList(),
})

export default makeSelectors

