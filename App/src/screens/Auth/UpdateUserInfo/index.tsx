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
import {openImagePicker} from '@utils/ImagePicker';
import {uploadImageAction} from '@appRedux/actions/otherAction';
import {IImageFile} from '@src/types/other';

interface IUserProfileSubset
  extends Pick<IUserProfile, 'name' | 'email' | 'bio'> {}

type UpdateUserInfoScreenProps = NativeStackScreenProps<
  NavigationStackParamList,
  typeof SCREEN_NAME.UPDATE_USER_INFO
>;
const UpdateUserInfo: React.FC<UpdateUserInfoScreenProps> = ({}) => {
  const actions = useActions({
    updateUserProfileAction,
    uploadImageAction,
  });
  const formRef = useRef<UpdateUserInfoViewRef>();

  const onUpdateUserProfile = ({
    name,
    email,
    bio,
    avatar_url,
  }: IUserProfileSubset) => {
    const callback: Callback = ({success, code}) => {
      if (success) {
        Navigator.goBack();
      } else if (code) {
        formRef.current.onError(code);
      }
    };
    actions.updateUserProfileAction(name, email, bio, avatar_url, callback);
  };

  const onUploadImage = () => {
    openImagePicker(
      (error, image) => {
        formRef.current.toggleLoading();
        if (error) {
          formRef.current.toggleLoading();
          return;
        }
        const callback: Callback = ({
          success,
          data,
        }: {
          success: boolean;
          data: IImageFile;
        }) => {
          if (success) {
            formRef.current.updateAvatar(data.uri);
            formRef.current.toggleLoading();
          }
        };
        actions.uploadImageAction(
          {
            uri: image[0].data,
            name: image[0].name,
            type: image[0].type,
          },
          callback,
        );
      },
      {
        multiple: false,
      },
    );
  };

  return (
    <UpdateUserInfoView
      ref={formRef}
      onUpdateUserProfile={onUpdateUserProfile}
      onUploadImage={onUploadImage}
    />
  );
};

export default UpdateUserInfo;
