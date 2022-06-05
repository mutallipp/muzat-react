import { createTypes } from "@/defineds/redux"

/**
 * 用户相关
 */
enum Types {
  /**
   * 登录
   */
  LOGIN = 'LOGIN',
  /**
   * 是否已经准备好了
   */
  SET_IS_READY = 'SET_IS_READY',
}

const UserTypes = createTypes(Types)

export default UserTypes
