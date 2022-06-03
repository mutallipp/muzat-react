import { combineReducers, Reducer } from "redux"
import addressReducer from './modules/adress/reducer'

export default function createReducer (): Reducer<any> {
  const rootReducer = combineReducers({
    // 公共状态
    address: addressReducer,
  })
  return rootReducer
}
