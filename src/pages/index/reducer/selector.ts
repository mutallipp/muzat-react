import { createSelector } from 'reselect'
import homePageState from './state'
import IHomepageState from './types'

/**
 * 获取地址相关数据状态
 * */

const selectAddressState = ({ address }: { address: IHomepageState }): IHomepageState => {
  return address || homePageState
}
/**
 * 获取国家列表
 * */
export const makeSelectCountryList = () => createSelector(
  selectAddressState,
  state => {
    return state
  },
)
