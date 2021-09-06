import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './auth'
import { message } from "antd"

const Request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 6000
})

// 请求拦截器
Request.interceptors.request.use((config: AxiosRequestConfig) => {
  if (getToken('SET_TOKEN')) {
    config.headers['Authorization'] = 'Bearer ' + getToken('SET_TOKEN')
  }
  return config
}, error => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
  error.data.errorCode = 1000
  return Promise.reject(error)
})

// 响应拦截器
Request.interceptors.response.use((response: AxiosResponse) => {
  return response
}, error => {
  const res = error.response
  if (!res) {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
    error.data.errorCode = 1000
    return Promise.resolve(error)
  }
  message.error(res.data.msg);
  return Promise.reject(res)
})

export default Request

