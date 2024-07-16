import React, {useRef} from 'react';
import {Alert} from 'react-native';

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
import {IImage} from '@src/types/other';

interface IUserProfileSubset
  extends Pick<IUserProfile, 'name' | 'email' | 'bio'> {}

type NewPostScreenProps = NativeStackScreenProps<
  NavigationStackParamList,
  typeof SCREEN_NAME.UPDATE_USER_INFO
>;
const UpdateUserInfo: React.FC<NewPostScreenProps> = ({}) => {
  const actions = useActions({
    updateUserProfileAction,
    uploadImageAction,
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
    actions.updateUserProfileAction(name, email, bio, callback);
  };

  const onUploadImage = () => {
    formRef.current.toggleLoading();
    openImagePicker((error, image) => {
      if (error) {
        console.log('onUploadImage error', error);
        Alert.alert('Error', 'Have error when upload image');
        return;
      }
      console.log('onUploadImage data', image);
      const callback: Callback = ({
        success,
        data,
      }: {
        success: boolean;
        data: IImage;
      }) => {
        if (success) {
          formRef.current.toggleLoading();
          formRef.current.updateAvatar(data.url);
        }
      };
      actions.uploadImageAction(
        {
          url: image[0].uri,
          name: image[0].name,
          size: image[0].size,
          type: image[0].type,
        },
        callback,
      );
    });
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
