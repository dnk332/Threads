import React from 'react';
import {useDispatch} from 'react-redux';
import UpdateUserInfoView from '@screens/Auth/UpdateUserInfo/view';
import {goBack} from '@navigators';
import {updateUserProfileAction} from '@src/redux/actions/user';
import {Callback} from '@src/redux/actionTypes/actionTypeBase';
import {IUserProfile} from '@src/types/user';
import {AppDispatch} from '@store';

interface IUserProfileSubset
  extends Pick<IUserProfile, 'name' | 'email' | 'bio'> {}

const UpdateUserInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onUpdateUserProfile = ({name, email, bio}: IUserProfileSubset) => {
    const callback: Callback = res => {
      if (res.success) {
        goBack();
      }
    };
    dispatch(updateUserProfileAction(name, email, bio, callback));
  };

  return <UpdateUserInfoView onUpdateUserProfile={onUpdateUserProfile} />;
};

export default UpdateUserInfo;
