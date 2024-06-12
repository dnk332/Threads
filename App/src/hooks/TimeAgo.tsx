import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import vi from 'javascript-time-ago/locale/vi';
import en from 'javascript-time-ago/locale/en';

import {GlobalComponent} from '@components';
import {AppStyleSheet} from '@themes/responsive';

const {AppText} = GlobalComponent;

interface TimeProps {
  children: string;
}

export default function TimeFromNow(props) {
  return (
    <ReactTimeAgo
      {...props}
      component={Time}
      timeStyle="twitter"
      locale="en-US"
      tick={true}
    />
  );
}

function Time({children}: TimeProps) {
  return (
    <AppText style={styles.time} fontSize={12} fontWeight={400}>
      {children}
    </AppText>
  );
}

export function SetUpTime() {
  TimeAgo.addDefaultLocale(en);
  TimeAgo.addLocale(vi);
}

const styles = AppStyleSheet.create({
  time: {
    marginRight: 8,
  },
});
