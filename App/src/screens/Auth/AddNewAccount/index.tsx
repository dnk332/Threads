import React, {useRef} from 'react';
import {RouteProp} from '@react-navigation/native';

import AddNewAccountView, {
  AddNewAccountViewRef,
  LoginParams,
} from '@screens/Auth/AddNewAccount/view';
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
  const usernameValue = route.params?.username ?? '';
  const waitToLogin = route.params?.waitToLogin ?? false;

  const formRef = useRef<AddNewAccountViewRef>();

  const actions = useActions({
    loginAction,
    registerAction,
  });

  const onSubmit = ({username, password}: LoginParams) => {
    formRef.current.setLoadingState(true);
    let callbackLogin: Callback = ({}) => {
      formRef.current.setLoadingState(false);
    };

    if (waitToLogin) {
      actions.loginAction(username, password, callbackLogin);
    } else {
      let callbackRegister: Callback = ({success}) => {
        if (success) {
          actions.loginAction(username, password, () => {});
        }
        formRef.current.setLoadingState(false);
      };
      actions.registerAction(username, password, callbackRegister);
    }
  };

  return (
    <AddNewAccountView
      ref={formRef}
      usernameValue={usernameValue}
      onSubmit={onSubmit}
    />
  );
};

export default AddNewAccount;
