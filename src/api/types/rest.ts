/**
 * 请求头部
 */
 export interface IRestHeader {
  [propName: string]: string,
}

/**
 * 请求方式
 */
export enum RequestMethod {
  GET ='GET',
  POST= 'POST',
  PUT ='PUT',
  DELETE= 'DELETE'
}
/**
 * 自定义返回类型code
 */
export enum ResultCode {
  SUCCESS = 200
}

/**
 * 接口响应数据
 */
export interface IResult<T> {
  code: number,
  msg: string,
  data: T,
}

/**
 * 自定义请求函数名字
 */
export enum RequestFucNames {
  REQUEST = 'request'
}
// 分页数据
export interface IPagination<T> {
  list: T,
  pageSize: number,
  totalCount: number,
}
