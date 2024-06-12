import React from 'react';

import {AppStyleSheet} from '@themes/responsive';
import {AppContainer, AppImage, AppText} from '@components';
import {colors} from '@themes/color';
import {Pressable, View} from 'react-native';
import SvgComponent from '@src/assets/svg';

// import * as Navigator from '@navigators';

const SwitchAccountView = () => {
  return (
    <AppContainer haveBackButton containerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <AppText fontSize={24} fontWeight={700} align={'center'}>
          Switch accounts
        </AppText>
        <AppText color={colors.text_gray} align={'center'}>
          {`Add or create a Threads profile by login in with an\nInstagram account`}
        </AppText>
      </View>
      <Pressable style={styles.loginButton}>
        <View style={styles.buttonContent}>
          <AppImage
            containerStyle={styles.buttonIcon}
            source={require('@assets/image/instagram-logo.png')}
          />
          <View style={styles.buttonText}>
            <AppText fontSize={12} color={colors.text_gray}>
              Log in with Instagram
            </AppText>
            <AppText fontSize={14} fontWeight={600}>
              LoginView
            </AppText>
          </View>
        </View>
        <SvgComponent color={colors.text_gray} name={'ARROW_RIGHT'} />
      </Pressable>
      <Pressable onPress={() => {}} style={styles.addAccountButton}>
        <AppText color={colors.text_gray} fontSize={12} fontWeight={600}>
          Log in with another Instagram account
        </AppText>
      </Pressable>
    </AppContainer>
  );
};

export default SwitchAccountView;

const styles = AppStyleSheet.create({
  container: {flex: 1},
  headerContainer: {
    gap: 10,
    marginTop: 16,
  },
  loginButton: {
    marginHorizontal: 16,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 14,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background_secondary,
    marginTop: '50%',
  },
  buttonContent: {
    flexDirection: 'row',
  },
  buttonText: {
    gap: 4,
    marginLeft: 16,
    alignSelf: 'center',
  },
  buttonIcon: {
    width: 46,
    height: 46,
  },
  addAccountButton: {
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
    paddingBottom: 40,
    backgroundColor: colors.background,
    width: '100%',
    alignItems: 'center',
    height: 86,
    paddingTop: 16,
  },
});
