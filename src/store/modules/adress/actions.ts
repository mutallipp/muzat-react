import { getActionsReturnType } from "@/defineds/redux"
import AddressTypes from "./constants"

const addressActions = {
    SET_REVERSE_NAME (reverseName: boolean) {
      return {
        type: AddressTypes.SET_REVERSE_NAME,
        payload: reverseName,
      }
    },
    SET_EMAIL_EXISTED (emailExisted: boolean) {
      return {
        type: AddressTypes.SET_EMAIL_EXISTED,
        payload: emailExisted,
      }
    },
  }

  const mockAction = getActionsReturnType(addressActions)
  export type AddressActionType = typeof mockAction

  export default addressActions
