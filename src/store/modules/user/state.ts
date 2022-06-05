import IUserState  from "./types";

/**
 * 用于流程控制，初始化完毕的时候调用这个就可以
 */
// eslint-disable-next-line import/no-mutable-exports
export let r = null

/**
 * 用户相关
 */
const userState: IUserState = {
  token: '',
  // r:t,
  isReady: new Promise(resolve => r = resolve)
}
export default userState
