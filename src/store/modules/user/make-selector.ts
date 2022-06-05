import { createStructuredSelector } from 'reselect'
import {
  makeSelectToken,
  makeSelectIsReady,
} from './selector'

const makeSelectors = createStructuredSelector({
  /**
   * token
   * */
  token: makeSelectToken(),
  /**
   * 否初始化完毕
   */
  isReady: makeSelectIsReady(),
})

export default makeSelectors

