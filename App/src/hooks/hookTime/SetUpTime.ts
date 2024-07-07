import TimeAgo from 'javascript-time-ago';
import vi from 'javascript-time-ago/locale/vi';
import en from 'javascript-time-ago/locale/en';

export function SetUpTime() {
  TimeAgo.addDefaultLocale(en);
  TimeAgo.addLocale(vi);
}
