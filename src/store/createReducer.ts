import { combineReducers, Reducer } from "redux"
import homePageReducer from '@pages/index/reducer/reducer'
import addressReducer from './modules/adress/reducer'
import userReducer from './modules/user/reducer'

export default function createReducer (): Reducer<any> {
  const rootReducer = combineReducers({
    // 页面
    homePage:homePageReducer,


    // 公共状态
    address: addressReducer,
    // 用户信息
    user:userReducer,
  })
  return rootReducer
}
