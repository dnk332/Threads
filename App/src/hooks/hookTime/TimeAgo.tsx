import React from 'react';
import ReactTimeAgo from 'react-time-ago';

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
      timeStyle="twitter-first-minute"
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

const styles = AppStyleSheet.create({
  time: {
    marginRight: 8,
  },
});
