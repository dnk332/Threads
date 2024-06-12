import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

// import {store} from '@store';
import * as Navigator from '@navigators';
// import {otherSelector} from '@selectors';
import {getParamsString} from '@utils/HelperUtil';

// const getToken = (): string | undefined =>
//   otherSelector.tokenSelect(store.getState())?.access_token;
// const getDevice = (): any => otherSelector.deviceSelect(store.getState());
// const getDomain = (): string | undefined =>
//   otherSelector.domainSelect(store.getState());

export const CodeResponse = {
  SUCCESS: 200,
};

interface RequestProps {
  params?: any;
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
    const api = axios.create({
      timeout: 300000,
    });

    api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // const token = getToken();
        // const device = getDevice();
        if (!config.baseURL) {
          // config.baseURL = `${getDomain()}`;
          config.baseURL = 'http://localhost:8082';
        }
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        // if (device) {
        //   config.headers.set('Device-Id', device.deviceId);
        //   config.headers.set('Device-Model', device.model);
        //   config.headers.set('Device-Version', device.systemVersion);
        //   config.headers.set('Device-Token', device.token);
        //   config.headers.set('Type', device.systemName);
        // }
        return config;
      },
      (error: AxiosError) => {
        console.log('xxxx ERROR REQUEST xxxx: ', error);
        return Promise.reject(error);
      },
    );

    api.interceptors.response.use(
      (response: AxiosResponse) => {
        return {
          ...response,
          isSuccess: response.status === CodeResponse.SUCCESS,
        };
      },
      (error: AxiosError) => {
        console.log('xxxx ERROR RESPONSE xxxx: ', error);
        const code = error.response?.data['code'];
        const message = error.response?.data['message'];
        if (code && this.exceptionCode.includes(code)) {
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

  async get(endPoint: string, props?: RequestProps): Promise<any> {
    const {params, headers} = props;
    console.log('==== GET ==== : ', endPoint, ' + params: ', params);
    try {
      if (params) {
        endPoint = `${endPoint}${getParamsString(params)}`;
      }
      const response = await this.http.get(endPoint, {
        headers: headers ?? {},
      });
      console.log('response', response);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post(endPoint: string, props?: RequestProps): Promise<any> {
    const {params, headers} = props;
    console.log('==== POST ==== : ', endPoint, ' + params: ', params);
    try {
      const response = await this.http.post(endPoint, params ?? {}, {
        headers: headers ?? {},
      });
      if (typeof response.data === 'string') {
        return Promise.resolve({message: response.data, success: true});
      }
      return Promise.resolve({...response.data, success: true});
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put(endPoint: string, props: RequestProps): Promise<any> {
    const {params, headers} = props;
    console.log('==== PUT ==== : ', endPoint, ' + params: ', params);
    try {
      const response = await this.http.put(endPoint, params, {
        headers: headers ?? {},
      });

      return Promise.resolve({...response.data, success: true});
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(endPoint: string, props: RequestProps): Promise<any> {
    const {headers} = props;
    console.log('==== DELETE ==== : ', endPoint);
    try {
      const response = await this.http.delete(endPoint, {
        headers: headers ?? {},
      });

      return Promise.resolve({...response.data, success: true});
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new HTTP();
