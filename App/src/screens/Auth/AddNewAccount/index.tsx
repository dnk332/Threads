import React from 'react';
import {RouteProp} from '@react-navigation/native';

import AddNewAccountView from '@screens/Auth/AddNewAccount/view';
import {NavigationStackParamList} from '@src/navigation/Stack';
import {loginAction, registerAction} from '@appRedux/actions/authAction';
import {Callback} from '@appRedux/actions/types/actionTypeBase';
import {useActions} from '@src/hooks/useActions';

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
  const actions = useActions({
    loginAction,
    registerAction,
  });
  const onRegister = (
    usernameValue: string,
    passwordValue: string,
    setLoadingValue: (value: boolean) => void,
  ) => {
    let callback: Callback = ({success}) => {
      if (success) {
        actions.loginAction(usernameValue, passwordValue, () => {});
      }
      setLoadingValue(false);
    };
    setLoadingValue(true);
    if (waitToLogin) {
      actions.loginAction(usernameValue, passwordValue, () => {
        setLoadingValue(false);
      });
    } else {
      actions.registerAction(usernameValue, passwordValue, callback);
    }
  };

  return <AddNewAccountView username={username} onRegister={onRegister} />;
};

export default AddNewAccount;
