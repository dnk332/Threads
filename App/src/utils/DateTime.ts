import Moment from 'moment';

export const format_ddMMyyyy = 'DD/MM/yyyy';
export const format_dd_mm_yyyy = 'DD-MM-yyyy';
export const format_hhmmDDMM = 'HH:mm, DD/MM';
export const format_DDMMHHmmm = 'DD-MM HH:mm';
export const format_hhMMDDMMYYYY = 'HH:mm, DD/MM/yyyy';
export const format_ddmm = 'DD/MM';
export const format_ddMMyyyy_hhmm = 'DD/MM/yyyy  |  hh:mm';
export const format_yyyyMMddTHHmmssZ = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
export const format_yyyyMMdd_HHmmss = 'YYYY-MM-DD HH-mm-ss';
export const format_yyyyMMdd_HHmmssz = 'YYYY-MM-DD HH:mm:ss';
export const format_yyyyMMdd = 'yyyy-MM-DD';
export const format_HHmmss = 'HH:mm:ss';
export const format_DDMMHHmm = 'DD/MM - HH:mm';
export const format_HHmm = 'HH:mm';
export const format_MMDD = 'MM-DD';
export const format_DDMM = 'DD-MM';

export function formatDate({dateTime, format = 'HH:mm DD/MM/yyyy'}) {
  return Moment(dateTime).format(format);
}

export function secondToTime(second) {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second - hours * 3600) / 60);
  const seconds = second - hours * 3600 - minutes * 60;
  return {
    hours: hours < 10 ? `0${hours}` : hours,
    minutes: minutes < 10 ? `0${minutes}` : minutes,
    seconds: seconds < 10 ? `0${seconds}` : seconds,
  };
}
export function getWeekdays(t) {
  return [
    t('date.mon'),
    t('date.tue'),
    t('date.wed'),
    t('date.thu'),
    t('date.fri'),
    t('date.sat'),
    t('date.sun'),
  ];
}
export function getMonths(t) {
  return [
    t('date.jan'),
    t('date.feb'),
    t('date.mar'),
    t('date.apr'),
    t('date.may'),
    t('date.jun'),
    t('date.jul'),
    t('date.aug'),
    t('date.sep'),
    t('date.oct'),
    t('date.nov'),
    t('date.dec'),
  ];
}

// takes either a unix time number, string or a Date object and returns time string
export const timeAgo = (time: number | string | Date) => {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) {
        time = time.getTime();
      }
      break;
    default:
      time = +new Date();
  }
  const time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'yesterday', 'tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'last week', 'next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'last month', 'next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'last year', 'next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'last century', 'next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  /* @ts-ignore */
  let seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now';
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  let i = 0;
  let format;

  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == 'string') {
        return format[list_choice];
      } else {
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    }
  return time;
};
