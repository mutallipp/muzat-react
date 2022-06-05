/* eslint-disable no-unused-vars */
import axios, { AxiosInstance, AxiosPromise } from 'axios'
import Taro from '@tarojs/taro'
import * as utils from '@utils/index'
import { IAnyObj } from '@defineds/index'
import { getStore } from "@store/index"
import configure from '@/config/index'
import {
  IRestHeader, RequestFucNames, RequestMethod,
} from './types/rest'
import buildURL from '../../node_modules/axios/lib/helpers/buildURL'
import settle from '../../node_modules/axios/lib/core/settle'

/**
 * axios封装
 */
class Axios {
  /**
   * axios实例
   */
  private _axiosCustom: AxiosInstance

  /**
   * 仓库实例
   */
  store: any

  constructor () {
    // axios实例
    this._axiosCustom = axios.create({
      withCredentials: true,
      timeout: (2 * 60 * 1000),
    })
    this._init()
  }

  // 初始化模块
  _init (): void {
    // 适配 小程序
    this._axiosCustom.defaults.adapter = this._uniAppRequest.bind(this)
    // 获取store实例
    this.store = getStore()
  }

  /**
   * 适配 小程序
   */
  private _uniAppRequest (config: any):AxiosPromise {
    return new Promise((resolve, reject) => {
      if (config.paramsType === 'x-www-form-urlencoded' && utils.actualTypeIsEqual(config.data, 'string')) {
        Object.assign(config, {
          data: JSON.parse(config.data),
        })
      }
      Taro.request({
        method: config.method as any,
        // url: buildURL(config.url, config.params, config.paramsSerializer),
        url: buildURL(config.url, config.params, config.paramsSerializer),
        header: config.headers,
        data: config.data,
        dataType: config.dataType,
        responseType: config.responseType,
        // sslVerify: config.sslVerify,
        complete: function complete (response: any) {
          // eslint-disable-next-line no-param-reassign
          response = {
            data: response.data,
            status: response.statusCode,
            errMsg: response.errMsg,
            headers: response.header, // 注意此处 单复数
            config,
          }
          settle(resolve, reject, response)
        },
      })
    })
  }

  // 初始化axios
  _initAxios (): void {
    this._axiosCustom = axios.create({
      timeout: (2 * 60 * 1000),
    })
  }

  // 设置公共header
  _getHeader (headers:IAnyObj={}): IAnyObj {
    const globalHeaders = {}
    if (!headers['content-type']) {
      Object.assign(globalHeaders, {
        'content-type': 'application/json',
      })
    }
    // token
    // if (this.store?.state?.user?.token) {
    //   Object.assign(globalHeaders, {
    //     token: this.store.state.user.token,
    //   })
    // }
    return Object.assign(globalHeaders, headers)
  }

  /**
   * 获取公共参数
   */
  _getParams (params: any, config: IAnyObj) {
    let newParams: FormData|null = null
    if (config.uploadFile) {
      if (utils.getElementType(config.uploadFileKey) !== 'array') throw new Error('uploadFileKey必须是一个数组')
      const form = new FormData()
      Object.entries(params).map(([key, value]: [string, any]) => {
        if (Reflect.has(params, key)) {
          if (config.uploadFileKey.includes(key) && utils.getElementType(value) === 'array') {
            value.map((item: any) => {
              form.append(key, item)
            })
          } else {
            form.append(key, value)
          }
        }
      })
      newParams = form
    } else {
      newParams = params
    }
    // formDate类型对象不做去除空值操作
    return utils.getElementActualType(newParams) !== 'formData' ? utils.pick({ ...newParams }) : newParams
  }

  /**
   *
   * @param url 计算url
   * @returns url
   */
  _getUrl (url: string, target = 'from-muzat'): string {
    if (/https?:/.test(url)) return url
    switch (target) {
      case 'apptest': {
        return `${process.env.VITE_APP_TEST_API}${url}`
      }
      case 'from-muzat': {
        return `${configure.HOST}${url}`
      }
      case 'from-node': {
        return url
      }
      default: {
        return url
      }
    }
  }

  /**
   * 核心请求函数，下面所有函数都基于此函数
   * @param href: string 请求的地址
   * @param params: object 请求参数，选填，默认: {}
   * @param config: object axios参数，选填，默认: {}
   * @param + autoErrorRes: boolean 是否自动处理响应错误，默认: true
   * @param + autoErrorData: boolean 是否自动处理后台错误，默认: true
   * @param + autoCancel: boolean 离开路由时是否自动取消当前页面发起的所有请求，默认: true
   * @returns Promise<any>
   */
  request<T> (url: string, params: IAnyObj = {}, config: IAnyObj = {}): Promise<T> {
    if (!this._axiosCustom) {
      return (Promise.resolve({
        code: -100,
        msg: '',
      })) as unknown as Promise<T>
    }

    const {
      // autoErrorRes = true,
      autoErrorData = true,
      // autoCancel = true,
      paramsType = 'raw',
      target = 'from-muzat',
    } = config
    if (!url) return Promise.reject(new Error('缺少请求url'))
    // if (autoCancel) {
    //   Object(config, {
    //     cancelToken: store.state[storeConstants.UPDATESOURCE].token,
    //   })
    // }

    if (!config.hideLoading) {
      utils.toast('处理中。。。', 'loading')
    }
    console.log('HOST',configure.HOST);

    const newParams = this._getParams(params, config)
    const newUrl = this._getUrl(url, target)
    // RequestMethod
    const args = {
      method: RequestMethod.POST as RequestMethod,
      url: newUrl,
      ...{
        ...config,
        headers: this._getHeader(config.headers),
      },
    }

    // 处理url传参
    if (args.method.toLowerCase() === 'get' || paramsType === 'form-data') {
      Object.assign(args, {
        params: newParams || {},
      })
    } else if (['raw', 'x-www-form-urlencoded'].includes(paramsType)) {
      Object.assign(args, {
        data: newParams || {},
      })
    } else {
      console.warn('paramsType的有效值为form-data|raw')
    }
    console.log(args)
    return this._axiosCustom(args).then(async res => {
      // uni.hideToast()
      const { data } = res
      console.log('请求成功', res)

      switch (target) {
        case 'from-muzat':
        case 'from-node':
          // case 'mall': {
          //   if (data?.code !== 100) {
          //     switch (data?.code) {
          //       default: {
          //         const errMsg = data?.msg || '未知的服务器错误'
          //         const errCod = data?.code
          //         console.warn(`请求接口: ${args.url}, 状态码: ${errCod}, 错误消息: ${errMsg}`)
          //         if (autoErrorRes) {
          //           utils.toast(errMsg, 'error', {
          //             duration: 5 * 1000,
          //           })
          //         }
          //       }
          //     }
          //   }
          //   break
          // }
      }

      if (config.responseType === 'blob') {
        return {
          data: {
            headers: res.headers,
            data,
          },
        }
      } else {
        return data
      }
    }, async error => {
      // 处理请求报错，如状态码为500、404、422等
      // uni.hideToast()
      if (error?.response?.status) {
        switch (error.response.status) {
          // 未登录
          case 401: {
            // 权限问题
            break
          }
          case 404: {
            // 资源不存在
            break
          }
          case 500: {
            // 服务端报错
            break
          }
          default: {
            // default
          }
        }
      }

      const newError = {
        originError: error,
        status: error?.response?.status || -100,
        data: error?.response?.data || {},
      }

      console.error(`网络请求异常，请求接口: ${args.url}, 异常状态码: ${newError.status}`)
      if (autoErrorData) {
        utils.toast(`网络请求异常, 异常状态码: ${newError.status}`, 'error', {
          duration: 7000,
        })
      }
      return Promise.reject(newError)
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _get<T> (href: string, params: IAnyObj = {}, config: IAnyObj = {}, outTime = -1, requestMethod:RequestFucNames = RequestFucNames.REQUEST): Promise<T> {
    if (!href) return Promise.reject(new Error('缺少入口'))
    const newConfig = {
      headers: config.headers || {},
      method: 'get',
      ...config,
    }
    if (requestMethod === 'request') {
      return this.request<T>(href, params, newConfig)
    }
    throw new Error('查找不到需要调用的函数')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _post<T> (href: string, params: IAnyObj = {}, config: IAnyObj = {}, outTime = -1, requestMethod = 'request'): Promise<T> {
    if (!href) return Promise.reject(new Error('缺少入口'))
    const newConfig = {
      headers: config.headers || {},
      method: 'post',
      ...config,
    }

    if (config.uploadFile) {
      Object.assign(newConfig.headers, {
        'content-type': 'multipart/form-data',
      })
    }
    // const urlObj = url.parse(href)
    // const queryObj = qs.parse(urlObj.query as string)
    // const query = qs.stringify(queryObj)
    // const newUrl = url.format(Object.assign(urlObj, {
    //   query,
    //   search: `?${query}`,
    // }))
    if (requestMethod === 'request') {
      return this.request<T>(href, params, newConfig)
    } else {
      throw new Error('查找不到需要调用的函数')
    }
  }

  /**
   * get请求 tips: api接口返回值类型统一命名方式 以I + 命名 + Result命令 ex: IInfoMemberResult
   * @param href: string 请求的地址
   * @param params: object 请求参数，选填，默认: {}
   * @param config: object axios参数，选填，默认: {}
   * @returns Promise<any>
   */
  public async get<T> (href: string, params: IAnyObj = {}, config: IAnyObj = {}, outTime = -1): Promise<T> {
    return this._get<T>(href, params, config, outTime)
  }

  /**
   * post请求 tips: api接口返回值类型统一命名方式 以I + 命名 + Result命令 ex: IInfoMemberResult
   * @param href: string 请求的地址
   * @param params: object 请求参数，选填，默认: {}
   * @param config: object axios参数，选填，默认: {}
   * @returns Promise<any>
   */
  async post<T> (href: string, params: IAnyObj = {}, config: IAnyObj = {}, outTime = -1): Promise<T> {
    return this._post<T>(href, params, config, outTime)
  }
}

export default new Axios()
