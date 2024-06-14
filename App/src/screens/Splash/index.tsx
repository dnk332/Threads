import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import BootSplash from 'react-native-bootsplash';

import {AppStyleSheet} from '@src/themes/responsive';
import {appActions} from '@src/redux/actions';
import * as Navigator from '@navigators';
import {colors} from '@themes/color';
import {AppImage} from '@src/components';

export default function Splash() {
  const dispatch = useDispatch();

  const HideSplash = async () => {
    await BootSplash.hide({fade: true});
  };

  useEffect(() => {
    dispatch(
      appActions.start(async () => {
        await HideSplash();
        Navigator.navigateAndSimpleReset('LOGIN');
      }),
    );
  }, [dispatch]);

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <View style={styles.contentLogo}>
        <View />
        <AppImage
          containerStyle={styles.logo}
          source={require('@assets/image/threads-logo.png')}
        />
        <AppImage
          containerStyle={styles.metaLogo}
          source={require('@assets/image/meta-logo.png')}
        />
      </View>
    </View>
  );
}

const styles = AppStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentLogo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '90%',
  },
  logo: {
    width: 120,
    height: undefined,
    aspectRatio: 0.85,
  },
  metaLogo: {
    width: 66,
    height: undefined,
    aspectRatio: 5,
    alignSelf: 'center',
  },
});
