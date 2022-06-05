import { UserActionType } from "./actions";
import UserTypes from "./constants";
import userState from "./state";
import IUserState  from "./types";

/**
 * 用户相关
 */
function userReducer(state: IUserState = userState, action: UserActionType) {
  switch (action.type) {
    /**
     * 登录
     */
    case UserTypes.LOGIN: {
      const { token = '' } = action.payload
      const newState = {
        token
      }
      Object.assign(state, newState)
      break
    }
  }
  return { ...state }
}

export default userReducer
