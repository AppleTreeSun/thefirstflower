import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HrRequestInterceptor, HrRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import 'element-plus/es/components/message/style/css'

const DEFAULT_SHOWLOADING = true

class HrRequest {
  instance: AxiosInstance
  interceptor?: HrRequestInterceptor
  showLoading: boolean
  loading?: any

  constructor(config: HrRequestConfig) {
    this.instance = axios.create(config)
    this.interceptor = config.interceptor
    this.showLoading = config.showLoading ?? DEFAULT_SHOWLOADING

    // 1.实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseInterceptorCatch
    )
    // 2.全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.3)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()
        return res.data
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: HrRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptor?.requestInterceptor) {
        config = config.interceptor.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptor?.responseInterceptor) {
            res = config.interceptor.responseInterceptor(res)
          }
          resolve(res)
          // 将showLoading设置为true,这样不会影响下一个请求
          this.showLoading = DEFAULT_SHOWLOADING
        })
        .catch((err) => {
          // 将showLoading设置为true,这样不会影响下一个请求
          this.showLoading = DEFAULT_SHOWLOADING
          reject(err)
        })
    })
  }

  get<T>(config: HrRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HrRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  patch<T>(config: HrRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  delete<T>(config: HrRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default HrRequest
