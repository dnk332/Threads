import React, {ReactElement} from 'react';
// Root
import HOME from '@svg/root/home.svg';
import INACTIVE_HOME from '@svg/root/home_inactive.svg';
import SEARCH from '@svg/root/search.svg';
import INACTIVE_SEARCH from '@svg/root/search_inactive.svg';
import NEWS from '@svg/root/news.svg';
import INACTIVE_NEWS from '@svg/root/news_inactive.svg';
import LIKE from '@svg/root/like.svg';
import INACTIVE_LIKE from '@svg/root/like_inactive.svg';
import USER from '@svg/root/user_detail.svg';
import INACTIVE_USER from '@svg/root/user_detail_inactive.svg';
// Common
import THREE_DOT from '@svg/common/threeDot.svg';
import HEART from '@svg/common/heart.svg';
import REPORT from '@svg/common/report.svg';
import SEND from '@svg/common/send.svg';
import MESSAGE from '@svg/common/message.svg';
import RED_HEART from '@svg/common/red_heart.svg';
import PLUS from '@svg/common/plus.svg';
import SAVE from '@svg/common/save.svg';
import HASH_TAG from '@svg/common/hashtag.svg';
import EYE_OFF from '@svg/common/eye_off.svg';
import NOTIFY_OFF from '@svg/common/notify_off.svg';
import USER_MINUS from '@svg/common/user_minus.svg';
import REPORT_CIRCLE from '@svg/common/report_circle.svg';
import ARROW_LEFT from '@svg/common/arrow_left.svg';

export type SVG = {
  [key: string]: ReactElement;
};

export const SVG_NAME: SVG = {
  HOME: <HOME />,
  INACTIVE_HOME: <INACTIVE_HOME />,
  SEARCH: <SEARCH />,
  INACTIVE_SEARCH: <INACTIVE_SEARCH />,
  NEWS: <NEWS />,
  INACTIVE_NEWS: <INACTIVE_NEWS />,
  LIKE: <LIKE />,
  INACTIVE_LIKE: <INACTIVE_LIKE />,
  USER_DETAIL: <USER />,
  INACTIVE_USER_DETAIL: <INACTIVE_USER />,

  THREE_DOT: <THREE_DOT />,
  HEART: <HEART />,
  REPORT: <REPORT />,
  SEND: <SEND />,
  MESSAGE: <MESSAGE />,
  RED_HEART: <RED_HEART />,
  PLUS: <PLUS />,
  SAVE: <SAVE />,
  HASH_TAG: <HASH_TAG />,
  EYE_OFF: <EYE_OFF />,
  NOTIFY_OFF: <NOTIFY_OFF />,
  USER_MINUS: <USER_MINUS />,
  REPORT_CIRCLE: <REPORT_CIRCLE />,
  ARROW_LEFT: <ARROW_LEFT />,
};
