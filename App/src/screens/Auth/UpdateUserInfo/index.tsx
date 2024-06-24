import React from 'react';

import UpdateUserInfoView from '@screens/Auth/UpdateUserInfo/view';
import {useDispatch} from 'react-redux';
import {userActions} from '@src/redux/actions';
import {goBack} from '@navigators';
const UpdateUserInfo = () => {
  const dispatch = useDispatch();

  const onUpdateUserProfile = data => {
    const {name, email, bio} = data;
    const callback = res => {
      if (res.success) {
        goBack();
      }
    };
    dispatch(userActions.updateUserInfoAction(name, email, bio, callback));
  };
  return <UpdateUserInfoView onUpdateUserProfile={onUpdateUserProfile} />;
};

export default UpdateUserInfo;
