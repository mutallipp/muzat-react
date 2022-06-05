import { createStructuredSelector } from 'reselect'
import {
  makeSelectToken,
} from './selector'

const makeSelectors = createStructuredSelector({
  /**
   * token
   * */
  token: makeSelectToken(),
})

export default makeSelectors

