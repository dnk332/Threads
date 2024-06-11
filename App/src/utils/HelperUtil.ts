// import _ from 'lodash';
// import moment from 'moment';
// import {Alert, Linking, NativeModules, Platform} from 'react-native';
// import jwt_decode from 'jwt-decode';
// import NetInfo from '@react-native-community/netinfo';

// const HelperUtil = {
//   isEmptyString: str => {
//     return !str || str.length === 0;
//   },

//   getDeviceLanguage: () => {
//     // noinspection JSUnresolvedVariable
//     let deviceLanguage =
//       Platform.OS === 'ios'
//         ? NativeModules.SettingsManager.settings.AppleLocale ||
//           NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
//         : NativeModules.I18nManager.localeIdentifier;

//     console.log('Device language', deviceLanguage);
//     deviceLanguage = _.head(_.split(deviceLanguage, '_', 1));

//     return deviceLanguage;
//   },

//   // isSimulator: () => {
//   //   return DeviceInfo.isEmulatorSync()
//   // },

//   randomNumber: () => {
//     return _.toString(_.random(10000, 99999));
//   },

//   uuidv4: () => {
//     return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
//       (
//         c ^
//         (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
//       ).toString(16),
//     );
//   },

// export const  getParamsString: params => {
//     return (
//       '?' +
//       Object.keys(params)
//         .map(k => {
//           return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
//         })
//         .join('&')
//     );
//   },

//   sleep: milliseconds => {
//     return new Promise(resolve => setTimeout(resolve, milliseconds));
//   },

//   formatNumberWithDot: number => {
//     const unitString = 'VND';
//     if (!_.isNumber(number)) return '0' + ' ' + unitString;
//     return (
//       number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ' + unitString
//     );
//   },

//   formatNumberToMoney: str => {
//     str = String(str);
//     return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
//   },
//   formatNumberPercentRoundingToMoney: (number, percent) => {
//     const unitString = 'VND';
//     const numberMoney = number * (1 + percent / 100);
//     const numberRounding = Math.round(numberMoney);
//     if (!_.isNumber(numberRounding)) return '0' + ' ' + unitString;
//     return (
//       numberRounding.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
//       ' ' +
//       unitString
//     );
//   },

//   getCurrentTime: () => {
//     return moment().unix();
//   },

//   getCurrentTimeUTC: () => {
//     return moment().format();
//   },

//   formatTime: timeString => {
//     return moment(timeString).format('DD/MM/YYYY');
//   },

//   formatDate: date => {
//     if (!moment(date).isValid()) return '';
//     return moment(date).format('DD/MM/YYYY');
//   },
//   formatDate2: date => {
//     if (!moment(date).isValid()) return '';
//     return moment(date).format('DD/MM/YYYY HH:mm:ss');
//   },
//   formatDateDDMMYYYYHHmm: date => {
//     if (!moment(date).isValid()) return '';
//     return moment(date).format('DD/MM/YYYY - HH:mm');
//   },
//   formatDateDDMMYYYYHHmmss: date => {
//     if (!moment(date).isValid()) return '';
//     return moment(date).format('DD/MM/YYYY - HH:mm:ss');
//   },
//   formatDateDDMM: date => {
//     if (!moment(date).isValid()) return '';
//     return moment(date).format('DD/MM');
//   },

//   // isValidUrl: (str) => {
//   //   const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
//   //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//   //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
//   //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//   //     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//   //     '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
//   //   return !!pattern.test(str);
//   // },

//   // getRandomInt: (min, max) => {
//   //   min = Math.ceil(min)
//   //   max = Math.floor(max)
//   //   return Math.floor(Math.random() * (max - min + 1)) + min
//   // },

//   // formatMoney: (cents) => {
//   //   // return String(cents).replace(/(.)(?=(\d{3})+$)/g, '$1.') + "đ"
//   //   return String(cents).replace(/(.)(?=(\d{3})+$)/g, '$1.')
//   // },

//   // isValidEmail: () => {
//   //   if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(username)) {
//   //     return 'Wrong email format'
//   //   }
//   // },

//   makePhoneCall: phoneNumber => {
//     let phoneNumberString = phoneNumber;
//     if (Platform.OS !== 'android') {
//       phoneNumberString = `telprompt:${phoneNumber}`;
//     } else {
//       phoneNumberString = `tel:${phoneNumber}`;
//     }

//     Linking.canOpenURL(phoneNumberString)
//       .then(supported => {
//         if (!supported) {
//           Alert.alert('Phone number is not available');
//         } else {
//           return Linking.openURL(phoneNumberString);
//         }
//       })
//       .catch(err => console.log(err));
//   },
//   makeEmail: email => {
//     const emailString = 'mailto:' + email;
//     Linking.canOpenURL(emailString)
//       .then(supported => {
//         if (!supported) {
//           Alert.alert('Email is not available');
//         } else {
//           return Linking.openURL(emailString);
//         }
//       })
//       .catch(err => console.log(err));
//   },
//   hideNationId: nationId => {
//     if (!nationId) return '';
//     nationId = nationId.toString();
//     try {
//       let dau = '';
//       let giua = '';
//       let cuoi = '';
//       for (let i = 0; i < nationId.length; i++) {
//         if (i < 3) {
//           dau = dau + nationId[i];
//         } else if (i > nationId.length - 4) {
//           cuoi = cuoi + nationId[i];
//         } else {
//           giua = giua + '*';
//         }
//       }
//       return dau + giua + cuoi;
//     } catch (error) {
//       return '';
//     }
//   },

//   // compareValues: (key, order = 'asc') => {
//   //   return function innerSort(a, b) {
//   //     if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
//   //       return 0;
//   //     }
//   //     const varA = (typeof a[key] === 'string')
//   //       ? a[key].toUpperCase() : a[key];
//   //     const varB = (typeof b[key] === 'string')
//   //       ? b[key].toUpperCase() : b[key];
//   //
//   //     let comparison = 0;
//   //     if (varA > varB) {
//   //       comparison = 1;
//   //     } else if (varA < varB) {
//   //       comparison = -1;
//   //     }
//   //     return (
//   //       (order === 'desc') ? (comparison * -1) : comparison
//   //     );
//   //   };
//   // },

//   // getCurrentPeriodDate: (date) => {
//   //   if (!moment(date).isValid()) return ''
//   //   return moment(date).subtract(1, 'months').format('DD/MM/YYYY')
//   // },

//   isDate: date => {
//     //console.log(date)
//     //console.log(moment(date, "DD/MM/YYYY", true).isValid())
//     return moment(date, 'DD/MM/YYYY', true).isValid();
//   },

//   getDataFromJWT: ({jwtString = ''}) => {
//     try {
//       return jwt_decode(jwtString);
//     } catch (e) {
//       return {};
//     }
//   },

//   convertChuCoDauSangKhongDau: str => {
//     try {
//       str = str.toLowerCase();
//       str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
//       str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
//       str = str.replace(/[ìíịỉĩ]/g, 'i');
//       str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
//       str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
//       str = str.replace(/[ỳýỵỷỹ]/g, 'y');
//       str = str.replace(/đ/g, 'd');
//       // str = str.replace(/\W+/g, ' ')
//       str = str.replace(/\s/g, '_');
//       return str;
//     } catch (e) {
//       return str;
//     }
//   },
//   dobCheckDateOfBird: (ngaysinh, loaiGiayToTuyThan) => {
//     console.log('dobCheckDateOfBird:', ngaysinh, loaiGiayToTuyThan);
//     const totalYear = moment(new Date(), 'DD/MM/YYYY').diff(
//       moment(ngaysinh, 'YYYY-MM-DD'),
//       'years',
//     );
//     console.log('totalYear:', totalYear);
//     const currentDate = new Date(moment(ngaysinh, 'YYYY-MM-DD')).getTime();
//     console.log('currentDate:', currentDate);
//     if (currentDate > new Date().getTime()) return false;
//     if (!isNaN(totalYear) && totalYear > 15) return false;

//     if (loaiGiayToTuyThan === 'CCCD') {
//       var loNgayCap = new Date(moment(ngaysinh, 'YYYY-MM-DD'));
//       var loNgaySinh = new Date(moment(ngaysinh, 'YYYY-MM-DD'));
//       var loNgayHienTai = new Date();
//       console.log('loNgayHienTai:', loNgayHienTai);
//       console.log('loNgaySinh:', loNgaySinh);
//       console.log('loNgapCap:', loNgayCap);

//       var loNgaySinhYear = loNgaySinh.getFullYear();
//       var loNgaySinhMonth = loNgaySinh.getMonth();
//       var loNgaySinhDay = loNgaySinh.getDate();

//       var loNgayHetHan25 = new Date(
//         loNgaySinhYear + 25,
//         loNgaySinhMonth,
//         loNgaySinhDay,
//       );
//       var loNgayHetHan40 = new Date(
//         loNgaySinhYear + 40,
//         loNgaySinhMonth,
//         loNgaySinhDay,
//       );
//       var loNgayHetHan60 = new Date(
//         loNgaySinhYear + 60,
//         loNgaySinhMonth,
//         loNgaySinhDay,
//       );
//       console.log('loNgayHetHan25:', loNgayHetHan25);
//       console.log('loNgayHetHan40:', loNgayHetHan40);
//       console.log('loNgayHetHan60:', loNgayHetHan60);
//       var loNgayHetHan25_2 = new Date(
//         loNgaySinhYear + 23,
//         loNgaySinhMonth,
//         loNgaySinhDay,
//       );
//       var loNgayHetHan40_2 = new Date(
//         loNgaySinhYear + 38,
//         loNgaySinhMonth,
//         loNgaySinhDay,
//       );
//       var loNgayHetHan60_2 = new Date(
//         loNgaySinhYear + 58,
//         loNgaySinhMonth,
//         loNgaySinhDay,
//       );

//       if (loNgayHetHan25 > loNgayHienTai) {
//         console.log('loNgayHetHan25:', loNgayHetHan25, loNgayCap);
//         if (loNgayCap <= loNgayHetHan25) {
//           return true;
//         } else {
//           return false;
//         }
//       } else {
//         console.log('loNgayHetHan25_2:', loNgayHetHan25_2, loNgayCap);
//         if (loNgayCap < loNgayHetHan25_2) {
//           return false;
//         } else {
//           console.log('loNgayHetHan40:', loNgayHetHan40, loNgayCap);
//           if (loNgayHetHan40 > loNgayHienTai) {
//             if (loNgayCap <= loNgayHetHan40) {
//               return true;
//             } else {
//               return false;
//             }
//           } else {
//             console.log('loNgayHetHan40_2:', loNgayHetHan40_2, loNgayCap);
//             if (loNgayCap < loNgayHetHan40_2) {
//               return false;
//             } else {
//               console.log('loNgayHetHan60:', loNgayHetHan60, loNgayCap);
//               if (loNgayHetHan60 > loNgayHienTai) {
//                 if (loNgayCap <= loNgayHetHan60) {
//                   return true;
//                 } else {
//                   return false;
//                 }
//               } else {
//                 console.log('loNgayHetHan60_2:', loNgayHetHan60_2, loNgayCap);
//                 if (loNgayCap < loNgayHetHan60_2) {
//                   return false;
//                 } else {
//                   return true;
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     return true;
//   },

//   dobCheckPhoneNumber: phone => {
//     let headNumber = ['09', '03', '07', '08', '05'];
//     for (var i = 0; i < headNumber.length; i++) {
//       if (phone.toString().trim().startsWith(headNumber[i])) {
//         return true;
//       }
//     }
//     return false;
//   },
//   formatCard: (value, isHide) => {
//     if (isHide) {
//       value = value.substring(0, 6) + '******' + value.substring(12);
//     }
//     let convertNumber = value.match(/.{1,4}/g);
//     return convertNumber.join(' ');
//   },

//   formatHideCardNumber: value => {
//     let str = value.substring(value.length, value.length - 4);
//     return '**** ' + str;
//   },

//   isInternetConnected: async () => {
//     return new Promise((resolve, reject) => {
//       NetInfo.fetch()
//         .then(state => {
//           resolve(state);
//         })
//         .catch(e => {
//           reject(e);
//         });
//     });
//   },

//   formatNumberWithCurrency: (number, currency) => {
//     if (!_.isNumber(number)) return '0' + ' ' + currency;
//     return (
//       number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ' + currency
//     );
//   },

//   isPlatformVersionHigher: ({majorAndroidVersion, majorIOSVersion} = {}) => {
//     try {
//       if (typeof Platform.Version === 'number' && Platform.OS === 'android') {
//         if (!majorAndroidVersion) {
//           return false;
//         }
//         console.log({androidVersion: Platform.Version});
//         return Platform.Version >= majorAndroidVersion;
//       }

//       if (Platform.OS === 'ios') {
//         if (!majorIOSVersion) {
//           return false;
//         }
//         const [major, minor] = _.toString(Platform.Version)
//           .split('.')
//           .map(c => parseInt(c, 10));
//         console.log({major, minor});

//         if (!major) {
//           return false;
//         }

//         console.log({iOSVersion: major});
//         return major >= majorIOSVersion;
//       }

//       return false;
//     } catch (e) {
//       console.log(e);
//       return false;
//     }
//   },

//   jsonStringify: data => {
//     try {
//       return JSON.stringify(data);
//     } catch (e) {
//       return null;
//     }
//   },

//   // async getDeviceInfo() {
//   //   // const uniqueId = DeviceInfo.getUniqueID()
//   //   // const readableVersion = DeviceInfo.getReadableVersion()
//   //   // const systemName = DeviceInfo.getSystemName()
//   //   // const systemVersion = DeviceInfo.getSystemVersion()
//   //   // const deviceLocale = DeviceInfo.getDeviceLocale()
//   //   // const firstInstallTime = DeviceInfo.getFirstInstallTime()
//   //   // const deviceId = DeviceInfo.getDeviceId()
//   //   // const timezone = DeviceInfo.getTimezone()
//   //   // const version = DeviceInfo.getVersion()
//   //   // const isEmulator = DeviceInfo.isEmulator()
//   //
//   //   // return {uniqueId, readableVersion, systemName, systemVersion, deviceLocale, firstInstallTime, deviceId, timezone, version, isEmulator}
//   // }
// };

// export {HelperUtil};

export const getParamsString = params => {
  return (
    '?' +
    Object.keys(params)
      .map(k => {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
      })
      .join('&')
  );
};
