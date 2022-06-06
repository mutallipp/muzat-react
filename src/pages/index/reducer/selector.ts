import { createSelector } from 'reselect'
import homePageState from './state'
import IHomepageState from './types'

/**
 * 获取地址相关数据状态
 * */

const selectAddressState = ({ homePage }: { homePage: IHomepageState }): IHomepageState => {
  return homePage || homePageState
}
/**
 * 获取首页轮播图数据
 * */
export const makeSelectSwiperImgList = () => createSelector(
  selectAddressState,
  state => {
    return state.swiperImgList
  },
)
/**
 * 获取首页类目
 */
export const makeSelectCategoriesList = () => createSelector(
  selectAddressState,
  state => {
    return state.categoriesList
  },
)
/**
 * 获取首页商品
 */
export const makeSelectProductList = () => createSelector(
  selectAddressState,
  state => {
    return state.categoriesList
  },
)
