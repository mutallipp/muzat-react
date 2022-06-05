import { createTypes } from "@/defineds/redux"

/**
 * 用户相关
 */
enum Types {
  /**
   * 登录
   */
  LOGIN = 'LOGIN'
}

const UserTypes = createTypes(Types)

export default UserTypes
