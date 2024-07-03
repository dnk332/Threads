import React from 'react';
import {useDispatch} from 'react-redux';
import UpdateUserInfoView from '@screens/Auth/UpdateUserInfo/view';
import {goBack} from '@navigators';
import {updateUserProfileAction} from '@src/redux/actions/user';
import {Callback} from '@src/redux/actionTypes/actionTypeBase';
import {IUserProfile} from '@src/types/user';
import {AppDispatch} from '@store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SCREEN_NAME from '@src/navigation/ScreenName';
import {NavigationStackParamList} from '@src/navigation/Stack';

interface IUserProfileSubset
  extends Pick<IUserProfile, 'name' | 'email' | 'bio'> {}
type NewPostScreenProps = NativeStackScreenProps<
  NavigationStackParamList,
  typeof SCREEN_NAME.UPDATE_USER_INFO
>;
const UpdateUserInfo: React.FC<NewPostScreenProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onUpdateUserProfile = ({name, email, bio}: IUserProfileSubset) => {
    const callback: Callback = ({success}) => {
      if (success) {
        goBack();
      }
    };
    dispatch(updateUserProfileAction(name, email, bio, callback));
  };

  return <UpdateUserInfoView onUpdateUserProfile={onUpdateUserProfile} />;
};

export default UpdateUserInfo;
