import Avatar from '@src/components/Avatar';
import AppInput from '@src/components/AppInput';
import AwareScrollView from '@src/components/AwareScrollView';
import AppBottomSheet from '@src/components/AppBottomSheet';
import AppText from '@src/components/AppText';
import PostItem from '@src/components/PostContent/PostItem';
import * as PostContent from '@src/components/PostContent';
import AppImage from '@src/components/AppImage';
import AppGroupButton from '@src/components/AppGroupButton';
import AppButton from '@src/components/AppButton';
import AppContainer from '@src/components/AppContainer';
import AppModal from '@src/components/AppModal';
import AppFormInput from '@src/components/AppFormInput';
import DissmissKeyboardView from '@src/components/DissmissKeyboardView';
import PostText from '@src/components/PostText';

export {
  Avatar,
  AppInput,
  AwareScrollView,
  AppBottomSheet,
  AppText,
  PostItem,
  PostContent,
  AppImage,
  AppGroupButton,
  AppButton,
  AppContainer,
  AppModal,
  AppFormInput,
  DissmissKeyboardView,
  PostText,
};

// App component only use for current project
export const AppComponent = {
  Avatar,
  AppInput,
  PostItem,
  AppGroupButton,
  AppButton,
  PostContent,
  PostText,
};

// Global component can use for every project
export const GlobalComponent = {
  AwareScrollView,
  AppBottomSheet,
  AppImage,
  AppText,
  AppContainer,
  AppFormInput,
  DissmissKeyboardView,
};
