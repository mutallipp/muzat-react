import { getActionsReturnType } from "@/defineds/redux"
import HomeApi from '@api/IHome/index'
import { getStore } from "@store/index"
import HomePageTypes from "./constants"

const homePageActions = {
  GET_HOME_PAGE_DATA() {
    return async (dispatch) => {
      const store = getStore()
      const state: any = store?.getState?.()
      // 等待数据初始化
      await state?.user?.isReady
      console.log('state---', state?.user);
      const { data } = await HomeApi.getHomePageDataApi()
      console.log('data', data);

      dispatch({
        type: HomePageTypes.GET_HOME_PAGE_DATA,
        payload: 'reverseName',
      })
      return data
    }
  },
}

const mockAction = getActionsReturnType(homePageActions)
export type HomePageActionType = typeof mockAction

export default homePageActions
