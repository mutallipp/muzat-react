import { createSelector } from 'reselect'
import addressState from './state'
import IAddressState from './types'

/**
 * 获取地址相关数据状态
 * */

 const selectAddressState = ({ address }:{address: IAddressState}):IAddressState => {
  return address || addressState
}
/**
 * 获取国家列表
 * */
 export const makeSelectCountryList = () => createSelector(
  selectAddressState,
  state => {
    return state.countryList
  },
)
