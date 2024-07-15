import React, {useRef} from 'react';
import UpdateUserInfoView, {
  UpdateUserInfoViewRef,
} from '@screens/Auth/UpdateUserInfo/view';
import Navigator from '@navigators';
import {updateUserProfileAction} from '@appRedux/actions/userAction';
import {Callback} from '@appRedux/actions/types/actionTypeBase';
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
  const formRef = useRef<UpdateUserInfoViewRef>();

  const onUpdateUserProfile = ({name, email, bio}: IUserProfileSubset) => {
    const callback: Callback = ({success, code}) => {
      if (success) {
        Navigator.goBack();
      } else if (code) {
        formRef.current.onError(code);
      }
    };
    console.log('press');
    actions.updateUserProfileAction(name, email, bio, callback);
  };

  return (
    <UpdateUserInfoView
      ref={formRef}
      onUpdateUserProfile={onUpdateUserProfile}
    />
  );
};

export default UpdateUserInfo;
