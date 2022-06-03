
import IAddressState from './types'
/**
 * 地址相关数据
 * */
 const addressState:IAddressState = {
  /**
   * 国家列表
   * */
  countryList: [],
  /**
   * 省列表
   * */
  stateListMap: {},
  /**
   * 根据地址国家接口
   * */
  reverseName: false,
  /**
   * 有无邮箱
   */
  emailExisted: true,
}
export default addressState
