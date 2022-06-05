import { ResultCode } from "@/api/types/rest"
import { getActionsReturnType } from "@/defineds/redux"
import user from '@api/IUser'
import UserTypes from "./constants"

const userActions = {
  SET_IS_READY (isReady: Promise<void>) {
    return {
      type: UserTypes.SET_IS_READY,
      payload: isReady,
    }
  },
  LOGIN () {
    return async (dispatch) => {
      const { code, data } = await user.loginApi()
      if (code !== ResultCode.SUCCESS) return
      const token = `${data.tokenHead} ${data.token}`
      dispatch({
        type: UserTypes.LOGIN,
        payload: {
          token
        },
      })
      dispatch(userActions.SET_IS_READY(Promise.resolve()))
      return token
    }
  },

}
const mockAction = getActionsReturnType(userActions)
export type UserActionType = typeof mockAction

export default userActions
