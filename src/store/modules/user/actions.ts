import { ResultCode } from "@/api/types/rest"
import { getActionsReturnType } from "@/defineds/redux"
import user from '@api/IUser'
import { AnyAction, Dispatch } from "redux"
import UserTypes from "./constants"

const userActions = {
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
      return token
    }
  },
}
const mockAction = getActionsReturnType(userActions)
export type UserActionType = typeof mockAction

export default userActions
