import React from 'react';
import SwitchAccountView from '@src/screens/Auth/SwitchAccount/view';
import {listAccountInfoSelector} from '@src/redux/selectors';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';

import * as Navigator from '@navigators';
import SCREEN_NAME from '@src/navigation/ScreenName';

const SwitchAccount = () => {
  const listAccountInfo = useSelectorShallow(listAccountInfoSelector);
  const onLogin = username => {
    Navigator.navigateTo(SCREEN_NAME.ADD_ACCOUNT, {
      username: username,
      waitToLogin: true,
    });
  };

  const onAddAccount = () => {
    Navigator.navigateTo(SCREEN_NAME.ADD_ACCOUNT);
  };
  return (
    <SwitchAccountView
      onAddAccount={onAddAccount}
      listAccountInfo={listAccountInfo}
      onLogin={onLogin}
    />
  );
};

export default SwitchAccount;
