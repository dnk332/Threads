import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
// import {appActions} from '@actions';
import {AppStyleSheet} from '@src/themes/responsive';
import {colors} from '@src/themes/color';
import {AppImage} from '@src/components';

export default function Splash({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(
    //   appActions.start(() => {
    //     navigation.replace('Main');
    //   }),
    // );
    SplashScreen.hide();
  }, [dispatch, navigation]);

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <View style={styles.contentLogo}>
        <View style={styles.logo}>
          <AppImage source={require('@assets/image/threads-logo.png')} />
          <ActivityIndicator
            size="large"
            color={colors.white}
            style={styles.loading}
          />
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  loading: {
    position: 'absolute',
    bottom: -70,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
