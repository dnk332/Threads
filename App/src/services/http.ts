import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {store} from '@src/redux/store';
import {accessTokenSelector, domainSelector} from '@src/redux/selectors';
import {getParamsString} from '@src/utils/HelperUtil';
import * as Navigator from '@src/navigation/NavigationService';
import {deviceInfoSelector} from '@src/redux/selectors/app';
import {IDeviceInfo} from '@src/redux/reducers/app';

// Access token retrieval
const getAccessToken = (): string | undefined =>
  accessTokenSelector(store.getState());

// Domain retrieval
const getDomain = (): string | undefined => domainSelector(store.getState());
const getDevice = (): IDeviceInfo | undefined =>
  deviceInfoSelector(store.getState());

// Response status codes
export const ResponseCode = {
  SUCCESS: 200,
};

// Request properties interface
interface RequestProps {
  params?: Record<string, any>;
  headers?: Record<string, any>;
}

class HTTP {
  private http: AxiosInstance;
  private exceptionCodes: string[];

  constructor() {
    this.http = this.setupInterceptors();
    this.exceptionCodes = ['jwt_auth_bad_iss', 'jwt_auth_invalid_token'];
  }

  private setupInterceptors(): AxiosInstance {
    const api = axios.create({timeout: 300000});

    // Request interceptor
    api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        const device = getDevice();
        config.baseURL = config.baseURL || getDomain();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (device) {
          config.headers['Device-Id'] = device.deviceId;
          config.headers['Device-Model'] = device.model;
          config.headers['Device-Version'] = device.systemVersion;
          config.headers['Device-Token'] = device.token;
          config.headers.Type = device.systemName;
        }
        return config;
      },
      (error: any) => Promise.reject(error),
    );

    // Response interceptor
    api.interceptors.response.use(
      (response: AxiosResponse) => ({
        ...response,
        isSuccess: response.status === ResponseCode.SUCCESS,
      }),
      (error: any) => {
        const {code, message} = error.response?.data || {};
        if (code && this.exceptionCodes.includes(code)) {
          Navigator.popToTop();
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

      console.log(
        `==== response ${method.toUpperCase()} ==== `,
        endPoint,
        response,
      );
      const data = response.data;
      return typeof data === 'string'
        ? {message: data, success: true}
        : {data, success: true};
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // HTTP methods
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
