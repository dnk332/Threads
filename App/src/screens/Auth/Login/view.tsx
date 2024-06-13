import React from 'react';
import {Pressable, View} from 'react-native';

import {AppStyleSheet} from '@themes/responsive';
import {AppContainer, AppImage, AppText} from '@components';
import {colors} from '@themes/color';
import SvgComponent from '@src/assets/svg';
import _ from 'lodash';

interface LoginViewProps {
  onLogin: () => void;
  onSwitchAccount: () => void;
  accountInfo: any;
}

const LoginView = ({onLogin, onSwitchAccount, accountInfo}: LoginViewProps) => {
  return (
    <View style={styles.container}>
      <AppImage
        containerStyle={styles.background}
        source={require('@assets/image/login-background.png')}
      />
      <AppContainer containerStyle={styles.container}>
        <Pressable onPress={onLogin} style={styles.loginButton}>
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
                {!_.isNil(accountInfo) ? accountInfo?.username : 'Account Name'}
              </AppText>
            </View>
          </View>
          <SvgComponent color={colors.text_gray} name={'ARROW_RIGHT'} />
        </Pressable>
        <Pressable onPress={onSwitchAccount} style={styles.switchAccountButton}>
          <AppText color={colors.text_gray} fontSize={12} fontWeight={600}>
            Switch accounts
          </AppText>
        </Pressable>
      </AppContainer>
    </View>
  );
};

export default LoginView;

const styles = AppStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  background: {
    height: '75%',
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
  switchAccountButton: {
    alignSelf: 'center',
    padding: 10,
    marginTop: 6,
  },
});
