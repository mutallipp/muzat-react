import { ResultCode } from "@/api/types/rest"
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
      const { data,code } = await HomeApi.getHomePageDataApi()
      if(code !== ResultCode.SUCCESS) return
      dispatch({
        type: HomePageTypes.GET_HOME_PAGE_DATA,
        payload: data,
      })
      return data
    }
  },
}

const mockAction = getActionsReturnType(homePageActions)
export type HomePageActionType = typeof mockAction

export default homePageActions
