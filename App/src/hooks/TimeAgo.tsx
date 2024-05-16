import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import AppText from '@components/AppText';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
import {AppStyleSheet} from '@themes/responsive';

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
  TimeAgo.addLocale(ru);
}

const styles = AppStyleSheet.create({
  time: {
    marginRight: 8,
  },
});
