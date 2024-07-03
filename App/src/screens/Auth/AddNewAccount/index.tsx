import React from 'react';
import {useDispatch} from 'react-redux';
import {RouteProp} from '@react-navigation/native';

import AddNewAccountView from '@screens/Auth/AddNewAccount/view';
import {NavigationStackParamList} from '@src/navigation/Stack';
import {AppDispatch} from '@src/redux/store';
import {loginAction, registerAction} from '@src/redux/actions/auth';
import {Callback} from '@src/redux/actionTypes/actionTypeBase';

type AddNewAccountScreenRouteProp = RouteProp<
  NavigationStackParamList,
  'ADD_ACCOUNT'
>;

type AddNewAccountProps = {
  route: AddNewAccountScreenRouteProp;
};

const AddNewAccount: React.FC<AddNewAccountProps> = ({route}) => {
  const username = route.params?.username ?? '';
  const waitToLogin = route.params?.waitToLogin ?? false;
  console.log('waitToLogin', waitToLogin);
  const dispatch = useDispatch<AppDispatch>();
  const onRegister = (usernameValue: string, passwordValue: string) => {
    let callback: Callback = ({success}) => {
      if (success) {
        dispatch(loginAction(usernameValue, passwordValue, callback));
      }
    };
    if (waitToLogin) {
      dispatch(loginAction(usernameValue, passwordValue, () => {}));
    } else {
      dispatch(registerAction(usernameValue, passwordValue, callback));
    }
  };

  return <AddNewAccountView username={username} onRegister={onRegister} />;
};

export default AddNewAccount;
