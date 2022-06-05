import { createSelector } from 'reselect'
import userState from './state'
import IUserState from './types'

/**
 * 获取地址相关数据状态
 * */

 const selectUserState = ({ user }:{user: IUserState}):IUserState => {
  return user || userState
}
/**
 * 是否已经登录了
 * */
 export const makeSelectIsReady = () => createSelector(
  selectUserState,
  state => {
    return state.isReady
  },
)
/**
 *
 * @returns token
 */
 export const makeSelectToken = () => createSelector(
  selectUserState,
  state => {
    return state.token
  },
)
