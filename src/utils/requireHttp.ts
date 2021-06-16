import axios, { AxiosRequestConfig } from 'axios';
const baseURL = "https://shaoxliu.cn";

import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { token } from '../store/index';

axios.defaults.withCredentials = true;

const request = axios.create({
  baseURL: baseURL,
  timeout: 8000
})

request.interceptors.request.use(
  config => {
    const TOKEN = localStorage.getItem('token');
    TOKEN && (config.headers.token = TOKEN);
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * @description: get请求
 * @param {string} url 请求链接段
 * @param {object} params 请求参数
 * @param {object} config 请求配置
 * @return {*}
 */
 const get = (url: string, params?: any) => {
   const reqData = {
     method: 'get',
     url,
     params
   } as AxiosRequestConfig;
  return request(reqData)
}
const post = (url: string, data?: any) => {
  const reqData = {
    method: 'post',
    url,
    data
  } as AxiosRequestConfig;
  
  return request(reqData)
}

export { request, get, post }