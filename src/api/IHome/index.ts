import { IResult } from '@api/types/rest'
import rest from '@api/rest'
import { IHomePageResult } from './types'

/**
 *
 * @returns 首页数据获取
 */
export const getHomePageDataApi = async (): Promise<IResult<IHomePageResult>> => {
  return rest.get<IHomePageResult>('/api/product/home')
}

export default {
  getHomePageDataApi,
}
