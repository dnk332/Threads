import React from 'react';
import AddNewAccountView from '@screens/Auth/AddNewAccount/view';

import {authActions} from '@actions';
import * as Navigator from '@navigators';
import {useDispatch} from 'react-redux';

const AddNewAccount = () => {
  const dispatch = useDispatch();
  const onRegister = (username: string, password: string) => {
    let callback = res => {
      if (res.success) {
        Navigator.goBack();
      }
    };

    dispatch(authActions.onRegister(username, password, callback));
  };
  return <AddNewAccountView onRegister={onRegister} />;
};

export default AddNewAccount;
