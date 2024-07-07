import React from 'react';
import UpdateUserInfoView from '@screens/Auth/UpdateUserInfo/view';
import Navigator from '@navigators';
import {updateUserProfileAction} from '@src/redux/actions/user';
import {Callback} from '@src/redux/actionTypes/actionTypeBase';
import {IUserProfile} from '@src/types/user';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SCREEN_NAME from '@src/navigation/ScreenName';
import {NavigationStackParamList} from '@src/navigation/Stack';
import {useActions} from '@src/hooks/useActions';

interface IUserProfileSubset
  extends Pick<IUserProfile, 'name' | 'email' | 'bio'> {}
type NewPostScreenProps = NativeStackScreenProps<
  NavigationStackParamList,
  typeof SCREEN_NAME.UPDATE_USER_INFO
>;
const UpdateUserInfo: React.FC<NewPostScreenProps> = ({}) => {
  const actions = useActions({
    updateUserProfileAction,
  });
  const onUpdateUserProfile = ({name, email, bio}: IUserProfileSubset) => {
    const callback: Callback = ({success}) => {
      if (success) {
        Navigator.goBack();
      }
    };
    actions.updateUserProfileAction(name, email, bio, callback);
  };

  return <UpdateUserInfoView onUpdateUserProfile={onUpdateUserProfile} />;
};

export default UpdateUserInfo;
