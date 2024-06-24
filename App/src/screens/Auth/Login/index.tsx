import React from 'react';
import _ from 'lodash';

import LoginView from '@src/screens/Auth/Login/view';
import * as Navigator from '@navigators';
import {currentAccountSelector} from '@src/redux/selectors';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';
import SCREEN_NAME from '@src/navigation/ScreenName';

const Login = () => {
  let currentAccount = useSelectorShallow(currentAccountSelector);
  const onLogin = () => {
    if (_.isEmpty(currentAccount)) {
      onSwitchAccount();
      return;
    }
    Navigator.navigateTo(SCREEN_NAME.ADD_ACCOUNT, {
      username: currentAccount.username,
      waitToLogin: true,
    });
  };

  const onSwitchAccount = () => {
    Navigator.navigateTo(SCREEN_NAME.SWITCH_ACCOUNT);
  };

  return (
    <LoginView
      onLogin={onLogin}
      onSwitchAccount={onSwitchAccount}
      accountInfo={currentAccount}
    />
  );
};

export default Login;
