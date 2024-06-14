import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {AppStyleSheet} from '@src/themes/responsive';
import {colors} from '@src/themes/color';
import {AppText} from '@src/components';

const LoadingInfoView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="small"
        color={colors.white}
        style={styles.loading}
      />
      <AppText>Get ready for Threads</AppText>
    </View>
  );
};

export default LoadingInfoView;

const styles = AppStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16,
    paddingBottom: 40,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
