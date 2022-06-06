import { HomePageActionType } from './actions'
import HomePageTypes from './constants'
import IHomePageState from './types'
import homePageState from './state'

/**
 * 地址相关
 * */
function homePageReducer(state: IHomePageState = homePageState, action: HomePageActionType): IHomePageState {
  switch (action.type) {
    /**
     * 设置是否反转显示表单姓名
     * */
    case HomePageTypes.GET_HOME_PAGE_DATA: {
      console.log('action.payload',action.payload);

      const {
        swiperImgList = [],
        categoriesList = [],
        productList = [],
      } = action.payload
      const newState = {
        swiperImgList,
        categoriesList,
        productList,
      }
      Object.assign(state, newState)
      break
    }
  }
  return { ...state }
}

export default homePageReducer
