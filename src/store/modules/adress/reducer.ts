import { AddressActionType } from './actions'
import AddressTypes from './constants'
import IAddressState from './types'
import addressState from './state'

/**
 * 地址相关
 * */
 function addressReducer (state: IAddressState = addressState, action: AddressActionType): IAddressState {
  switch (action.type) {
    /**
     * 设置是否反转显示表单姓名
     * */
    case AddressTypes.SET_REVERSE_NAME: {
      const newState = {
        reverseName: action.payload,
      }
      Object.assign(state, newState)
      break
    }
    /**
     * 设置有无邮箱
     */
    case AddressTypes.SET_EMAIL_EXISTED: {
      const newState = {
        emailExisted: action.payload,
      }
      Object.assign(state, newState)
      break
    }
  }
  return { ...state }
}

export default addressReducer
