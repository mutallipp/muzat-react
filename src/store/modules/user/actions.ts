import { getActionsReturnType } from "@/defineds/redux"
import UserTypes from "./constants"

const userActions = {
  LOGIN() {
    return {
      type: UserTypes.LOGIN,
      payload: 'token'
    }
  },
}
const mockAction = getActionsReturnType(userActions)
export type UserActionType = typeof mockAction

export default userActions
