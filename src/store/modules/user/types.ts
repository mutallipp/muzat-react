
/**
 * 用户相关的数据
 */
export default interface IUserState {
  token: string,
  /**
   * 否初始化完毕
   */
  isReady?:Promise<boolean>,
}
