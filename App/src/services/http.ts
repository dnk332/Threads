import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {store} from '@src/redux/store';
import {accessTokenSelector, domainSelector} from '@src/redux/selectors';
import {getParamsString} from '@src/utils/HelperUtil';
import {popToTop} from '@src/navigation/NavigationService';

const accessTokenValue = (): string | undefined =>
  accessTokenSelector(store.getState());
const getDomain = (): string | undefined => domainSelector(store.getState());

export const CodeResponse = {
  SUCCESS: 200,
};

interface RequestProps {
  params?: Record<string, any>;
  headers?: Record<string, any>;
}

class HTTP {
  private http: AxiosInstance;
  private exceptionCode: string[];

  constructor() {
    this.http = this.setupInterceptors();
    this.exceptionCode = ['jwt_auth_bad_iss', 'jwt_auth_invalid_token'];
  }

  private setupInterceptors(): AxiosInstance {
    const api = axios.create({timeout: 300000});

    api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = accessTokenValue();
        config.baseURL = config.baseURL || getDomain();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error),
    );

    api.interceptors.response.use(
      (response: AxiosResponse) => ({
        ...response,
        isSuccess: response.status === CodeResponse.SUCCESS,
      }),
      (error: any) => {
        const {code, message} = error.response?.data || {};
        if (code && this.exceptionCode.includes(code)) {
          popToTop();
        }
        if (message) {
          error.message = message;
        }
        return Promise.reject(error);
      },
    );

    return api;
  }

  private async request(
    method: 'get' | 'post' | 'put' | 'delete',
    endPoint: string,
    props?: RequestProps,
  ): Promise<any> {
    const {params, headers} = props || {};
    console.log(
      `==== ${method.toUpperCase()} ==== `,
      endPoint,
      ' + params: ',
      params,
    );
    try {
      const config: AxiosRequestConfig = {headers: headers || {}};
      if (method === 'get' && params) {
        endPoint += `/${getParamsString(params)}`;
      }
      const response = await this.http[method](
        endPoint,
        method === 'get' ? config : params,
        config,
      );
      const data = response.data;
      return typeof data === 'string'
        ? {message: data, success: true}
        : {data, success: true};
    } catch (error) {
      return Promise.reject(error);
    }
  }

  get(endPoint: string, props?: RequestProps): Promise<any> {
    return this.request('get', endPoint, props);
  }

  post(endPoint: string, props?: RequestProps): Promise<any> {
    return this.request('post', endPoint, props);
  }

  put(endPoint: string, props: RequestProps): Promise<any> {
    return this.request('put', endPoint, props);
  }

  delete(endPoint: string, props: RequestProps): Promise<any> {
    return this.request('delete', endPoint, props);
  }
}

export default new HTTP();
