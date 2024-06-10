import axios from 'axios';
import {DOMAIN_API} from '~/utils/AppConst';

const REQUEST_TIMEOUT = 60000;

export default class APIUtils {
  accessTokenUser = '';

  static setAccessToken(token) {
    this.accessTokenUser = token;
    this.accessToken = token ? `Bearer ${token}` : '';
    console.log('token', token);
  }

  static getAccessToken() {
    return this.accessToken;
  }

  static get(url, params, headers) {
    console.log('>>>>> GET Request >>>>> params ', {url, params});
    return new Promise((resolve, reject) =>
      axios
        .get(DOMAIN_API + url, {
          timeout: REQUEST_TIMEOUT / 2,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
            ...headers,
          },
          params,
        })
        .then(response => {
          console.log('>>>>>>> GET Response >>>>>> ' + url + ':', response);
          const {data} = response;
          resolve(data);
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        }),
    );
  }

  static post(url, postData, headers) {
    return new Promise((resolve, reject) => {
      console.log('>>>>> POST Request >>>>> postData', url, postData);
      console.log('TOKEN AUTH:::', this.accessToken);
      axios
        .post(DOMAIN_API + url, postData, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
            ...headers,
          },
        })
        .then(response => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          const {data} = response;
          resolve(data);
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        });
    });
  }

  static delete(url, postData, headers) {
    return new Promise((resolve, reject) => {
      console.log('>>>>>>> Request delete>>>>>> : ', url, postData);
      axios
        .delete(DOMAIN_API + url, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
            ...headers,
          },
          data: postData,
        })
        .then(response => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          const {data} = response;
          resolve(data);
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        });
    });
  }

  static uploadFile(files) {
    console.log('>>>>>>> Request post>>>>>> : ', files);
    const data = new FormData();
    for (let file of files) {
      console.log('file', file);

      const uri = file.uri || file.path;
      data.append('image', {
        type: file.type || file.mime,
        uri: file.uri || file.path,
        name: file.name || uri.split('/').pop(),
      });
      data.append('is_convert', true);
    }
    console.log('data append', data);
    return new Promise((resolve, reject) =>
      axios
        .post(DOMAIN_API + '/user/media/cloud/upload', data, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: this.accessToken,
          },
        })
        .then(response => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          const {data} = response;
          console.log('>>>>>>> data>>>>>> : ', data);

          resolve(data);
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        }),
    );
  }
}
