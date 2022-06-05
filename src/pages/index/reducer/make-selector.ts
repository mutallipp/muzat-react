import { createStructuredSelector } from 'reselect'
import {
  makeSelectCountryList,
} from './selector'

const makeSelectors = createStructuredSelector({
  /**
   * 国家列表
   * */
  countryList: makeSelectCountryList(),
})

export default makeSelectors

