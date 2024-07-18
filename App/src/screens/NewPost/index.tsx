import React, {useRef} from 'react';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import NewPostScreenView, {NewPostScreenRef} from './view';
import {BottomTabsStackParamList} from '@src/screens/Root';
import {useActions} from '@src/hooks/useActions';
import {
  createPostAction,
  creatingPostAction,
} from '@appRedux/actions/postAction';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';
import {currentUserProfileSelector} from '@src/redux/selectors';
import Navigator from '@navigators';
import {openImagePicker} from '@utils/ImagePicker';
import {uploadImageAction} from '@appRedux/actions/otherAction';
import {IImage} from '@src/types/other';
import {Callback} from '@appRedux/actions/types/actionTypeBase';

type DetailsScreenRouteProp = RouteProp<BottomTabsStackParamList, 'NEW_POST'>;

export type NewPostScreenProps = {
  route: DetailsScreenRouteProp;
  navigation: NavigationProp<ParamListBase>;
};

const NewPostScreen = () => {
  const userInfo = useSelectorShallow(currentUserProfileSelector);
  const actions = useActions({
    createPostAction,
    uploadImageAction,
    creatingPostAction,
  });

  const formRef = useRef<NewPostScreenRef>();

  const createPost = (textContent: string, images: IImage[]) => {
    actions.creatingPostAction(true);
    Navigator.goBack();
    Toast.show({
      type: 'posting',
      props: {title: 'Posting'},
    });
    const callback: Callback = ({success}) => {
      if (success) {
        actions.creatingPostAction(false);
        setTimeout(() => {
          Toast.hide();
        }, 3000);
      }
    };
    actions.createPostAction(textContent, images, callback);
  };

  const uploadImage = () => {
    openImagePicker(
      (error, postImages: IImage[]) => {
        if (error) {
          return;
        }
        formRef.current.onUpdatePostImage(postImages);
      },
      {
        multiple: true,
        cropping: false,
      },
    );
  };

  return (
    <NewPostScreenView
      ref={formRef}
      createPost={createPost}
      uploadImage={uploadImage}
      userInfo={userInfo}
    />
  );
};

export default NewPostScreen;
