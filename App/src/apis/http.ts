import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import {store} from '@store';
import Navigator from '@navigators';
import {deviceSelect, domainSelect, tokenSelect} from '@selectors';

const getToken = (): string | undefined =>
  tokenSelect(store.getState())?.access_token;
const getDevice = (): any => deviceSelect(store.getState());
const getDomain = (): string | undefined => domainSelect(store.getState());

export const CodeResponse = {
  SUCCESS: 200,
};

interface RequestProps {
  params?: Record<string, any>;
  headers?: Record<string, any>;
  responseType?: string;
  loading?: boolean;
  onProgress?: (percent: number) => void;
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
        const token = getToken();
        const device = getDevice();
        if (!config.baseURL) {
          config.baseURL = `${getDomain()}`;
        }
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (device) {
          config.headers.set('Device-Id', device.deviceId);
          config.headers.set('Device-Model', device.model);
          config.headers.set('Device-Version', device.systemVersion);
          config.headers.set('Device-Token', device.token);
          config.headers.set('Type', device.systemName);
        }
        return config;
      },
      (error: AxiosError) => {
        console.log('Error Request >>>', error);
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
        console.log('Error Response >>>', error);
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
    try {
      const response = await this.http.get(endPoint, {
        params: props?.params ?? {},
        headers: props?.headers ?? {},
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post(endPoint: string, props?: RequestProps): Promise<any> {
    try {
      const response = await this.http.post(endPoint, props?.params ?? {}, {
        headers: props?.headers ?? {},
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
    try {
      const response = await this.http.delete(endPoint, {
        headers: headers ?? {},
      });

      return Promise.resolve({...response.data, success: true});
    } catch (error) {
      return Promise.reject(error);
    }
  }

  //   async download(endPoint: string, props: RequestProps): Promise<any> {
  //     const {headers, loading = false, onProgress} = props;
  //     if (loading) {
  //       Navigator.showLoading({loading: true});
  //     }
  //     const fileName = getFileName(endPoint) ?? Date.now().toString();
  //     const storePath = `${FileSystem.documentDirectory}/${fileName}`;

  //     const instance = FileSystem.createDownloadResumable(
  //       endPoint,
  //       storePath,
  //       {headers},
  //       e => {
  //         const value = (e.totalBytesWritten / e.totalBytesExpectedToWrite) * 100;
  //         onProgress?.(value);
  //       },
  //     );
  //     try {
  //       const {uri} = await instance.downloadAsync();
  //       if (loading) {
  //         Navigator.showLoading({loading: false});
  //       }
  //       return Promise.resolve(uri);
  //     } catch (error) {
  //       if (loading) {
  //         Navigator.showLoading({loading: false});
  //       }
  //       return Promise.reject(error);
  //     }
  //   }
}

export default new HTTP();
