import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface HrRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface HrRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: HrRequestInterceptor<T>
  showLoading?: boolean
}

export { HrRequestInterceptor, HrRequestConfig }
