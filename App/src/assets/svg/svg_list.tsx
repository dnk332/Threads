import HOME from '../svg/root/home.svg';
import INACTIVE_HOME from '../svg/root/home_inactive.svg';
import SEARCH from '../svg/root/search.svg';
import INACTIVE_SEARCH from '../svg/root/search_inactive.svg';
import NEWS from '../svg/root/news.svg';
import LIKE from '../svg/root/like.svg';
import INACTIVE_LIKE from '../svg/root/like_inactive.svg';
import USER from '../svg/root/user_detail.svg';
import INACTIVE_USER from '../svg/root/user_detail_inactive.svg';
import React, {ReactElement} from 'react';

export type SVG = {
  [key: string]: ReactElement;
};

export const SVG_NAME: SVG = {
  HOME: <HOME />,
  INACTIVE_HOME: <INACTIVE_HOME />,
  SEARCH: <SEARCH />,
  INACTIVE_SEARCH: <INACTIVE_SEARCH />,
  NEWS: <NEWS />,
  LIKE: <LIKE />,
  INACTIVE_LIKE: <INACTIVE_LIKE />,
  USER_DETAIL: <USER />,
  INACTIVE_USER_DETAIL: <INACTIVE_USER />,
};
