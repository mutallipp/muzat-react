/**
 * 地址相关数据
 * */

 export default interface IAddressState {
  /**
   * 国家列表
   * */
  countryList:Array<string>,
  /**
   * 省列表Map对象
   * */
  stateListMap: Record<string, Array<string>>
  /**
   * 是否表单地址姓名反转展示
   * */
  reverseName: boolean
  /**
   * 有无邮箱
   */
  emailExisted:boolean
}
