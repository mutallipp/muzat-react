import { createTypes } from '@defineds/redux'

/**
 * 地址相关
 * */

enum Types {
  /**
   * 获取首页数据
   * */
  GET_HOME_PAGE_DATA = 'GET_HOME_PAGE_DATA',
}

const HomePageTypes = createTypes(Types)

export default HomePageTypes
