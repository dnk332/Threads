import React from 'react';

import SwitchAccountView from '@src/screens/Auth/SwitchAccount/view';
import {listAccountSelector} from '@src/redux/selectors';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';

import * as Navigator from '@navigators';
import SCREEN_NAME from '@src/navigation/ScreenName';

const SwitchAccount: React.FC = () => {
  const listAccount = useSelectorShallow(listAccountSelector);

  const onLogin = (username: string) => {
    Navigator.navigateTo(SCREEN_NAME.ADD_ACCOUNT, {
      username,
      waitToLogin: true,
    });
  };

  const onAddAccount = () => {
    Navigator.navigateTo(SCREEN_NAME.ADD_ACCOUNT);
  };

  return (
    <SwitchAccountView
      onAddAccount={onAddAccount}
      listAccount={listAccount}
      onLogin={onLogin}
    />
  );
};

export default SwitchAccount;
