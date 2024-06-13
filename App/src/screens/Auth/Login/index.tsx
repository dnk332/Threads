import React from 'react';
import {useDispatch} from 'react-redux';

import {authActions} from '@actions';
import LoginView from '@src/screens/Auth/Login/view';
import * as Navigator from '@navigators';
import {
  listAccountInfoSelector,
  currentAccountIndexSelector,
} from '@src/redux/selectors';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';
import _ from 'lodash';

const Login = () => {
  const dispatch = useDispatch();
  const listAccountInfo = useSelectorShallow(listAccountInfoSelector);
  const currentAccountIndex = useSelectorShallow(currentAccountIndexSelector);

  let accountInfo = null;
  if (_.isArray(listAccountInfo)) {
    accountInfo = listAccountInfo[currentAccountIndex];
  }

  const onLogin = () => {
    let callback = () => {};

    dispatch(
      authActions.onLogin(
        accountInfo?.username,
        accountInfo?.password,
        callback,
      ),
    );
  };

  const onSwitchAccount = () => {
    Navigator.navigateTo('SWITCH_ACCOUNT');
  };

  return (
    <LoginView
      onLogin={onLogin}
      onSwitchAccount={onSwitchAccount}
      accountInfo={accountInfo}
    />
  );
};

export default Login;
