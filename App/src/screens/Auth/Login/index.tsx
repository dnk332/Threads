import React from 'react';
import _ from 'lodash';

import LoginView from '@src/screens/Auth/Login/view';
import Navigator from '@navigators';
import {currentAccountSelector} from '@src/redux/selectors';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';
import SCREEN_NAME from '@src/navigation/ScreenName';

const Login: React.FC = () => {
  const currentAccount = useSelectorShallow(currentAccountSelector);

  const onLogin = () => {
    Navigator.navigateTo(SCREEN_NAME.ADD_ACCOUNT, {
      username: !_.isEmpty(currentAccount) ? currentAccount.username : '',
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
