import HrRequest from './request'
import localCache from '@/utils/cache'

const hrRequest = new HrRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  interceptor: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default hrRequest
