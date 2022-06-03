import { createTypes } from '@defineds/redux'

/**
 * 地址相关
 * */

enum Types {
  /**
   * 获取国家列表
   * */
  GET_REGION_COUNTRY_LIST = 'GET_REGION_COUNTRY_LIST',
  /**
   * 获取省列表
   * */
  GET_REGION_STATE_LIST = 'GET_REGION_STATE_LIST',
  /**
   * 是否反转表单元素中姓名填写
   * */
  SET_REVERSE_NAME = 'SET_REVERSE_NAME',
  /**
   * 有无邮箱
   */
  SET_EMAIL_EXISTED = 'SET_EMAIL_EXISTED'
}

const AddressTypes = createTypes(Types)

export default AddressTypes
