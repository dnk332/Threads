import React from 'react';
import SwitchAccountView from '@src/screens/Auth/SwitchAccount/view';
import {listAccountInfoSelector} from '@src/redux/selectors';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';
import {useDispatch} from 'react-redux';
import {authActions} from '@src/redux/actions';

const SwitchAccount = () => {
  const dispatch = useDispatch();
  const listAccountInfo = useSelectorShallow(listAccountInfoSelector);
  const onLogin = ({username, password}) => {
    let callback = () => {};

    dispatch(authActions.onLogin(username, password, callback));
  };
  return (
    <SwitchAccountView listAccountInfo={listAccountInfo} onLogin={onLogin} />
  );
};

export default SwitchAccount;
