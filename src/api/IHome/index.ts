import { IResult } from '@api/types/rest'
import rest from '@api/rest'

/**
 *
 * @returns 首页数据获取
 */
export const getHomePageDataApi = async (): Promise<IResult<any>> => {
  return rest.get<any>('/api/product/home')
}

export default {
  getHomePageDataApi,
}
