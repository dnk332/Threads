import React from 'react';
import AddNewAccountView from '@screens/Auth/AddNewAccount/view';

import {authActions} from '@actions';
import {useDispatch} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {NavigationStackParamList} from '@src/navigation/Stack';

type AddNewAccountScreenRouteProp = RouteProp<
  NavigationStackParamList,
  'ADD_ACCOUNT'
>;

type AddNewAccountProps = {
  route: AddNewAccountScreenRouteProp;
};

const AddNewAccount = ({route}: AddNewAccountProps) => {
  const username = route.params?.username || '';
  const waitToLogin = route.params?.waitToLogin || false;

  const dispatch = useDispatch();
  const onRegister = (usernameValue: string, passwordValue: string) => {
    let callback = res => {
      if (res.success) {
        dispatch(
          authActions.onLoginAction(usernameValue, passwordValue, callback),
        );
      }
    };

    if (waitToLogin) {
      dispatch(
        authActions.onLoginAction(usernameValue, passwordValue, () => {}),
      );
    } else {
      dispatch(
        authActions.onRegisterAction(usernameValue, passwordValue, callback),
      );
    }
  };

  return <AddNewAccountView username={username} onRegister={onRegister} />;
};

export default AddNewAccount;
