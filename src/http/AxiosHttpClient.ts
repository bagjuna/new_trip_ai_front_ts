import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import HttpError from '@/http/HttpError';
import {singleton} from "tsyringe";

export type HttpRequestConfig = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  params?: any;
  body?: any;
};

interface ErrorResponse {
  code?: string;
  message?: string;
}

@singleton()
export default class AxiosHttpClient {
  private readonly client: AxiosInstance = axios.create({
    timeout: 3000,
    timeoutErrorMessage: '요청 시간이 초과되었습니다. ---',
  });

  public async request(config: HttpRequestConfig) {
    return this.client
      .request({
        method: config.method,
        url: config.path,
        params: config.params,
        data: config.body,
      })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        return Promise.reject(new HttpError(e));
      });
  }
}
