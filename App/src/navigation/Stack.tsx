// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';

import RootScreen from '../screens/Root';
import Navigator from '@navigators';
import {
  AddNewAccountScreen,
  ImageViewerScreen,
  LoadingInfoScreen,
  LoginScreen,
  NewPostScreen,
  SplashScreen,
  SwitchAccountScreen,
  UpdateUserInfoScreen,
} from '@screens/index';
import {IUser} from '@src/types/user';
import SCREEN_NAME from './ScreenName';

export interface NavigationStackParamList {
  ROOT: undefined;
  IMAGE_VIEWER: {imageLink: string};
  NEW_POST_MODAL: {focused: boolean};
  LOGIN: undefined;
  SWITCH_ACCOUNT: undefined;
  ADD_ACCOUNT: {username?: string; waitToLogin?: boolean};
  SPLASH: undefined;
  LOADING_INFO: undefined;
  SETTINGS: undefined;
  UPDATE_USER_INFO: {currentAccount: IUser};

  [key: string]:
    | undefined
    | {
        imageLink?: string;
        focused?: boolean;
        username?: string;
        waitToLogin?: boolean;
        currentAccount?: IUser;
      };
}

// Type to map SCREEN_NAME keys to NavigationStackParamList keys
export type ScreenNameKeys = keyof typeof SCREEN_NAME;
export type NavigationParams = {
  [K in ScreenNameKeys]: NavigationStackParamList[K];
};

const Stack = createNativeStackNavigator<NavigationStackParamList>();

function StackScreens() {
  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide({fade: true});
      }}
      ref={Navigator.navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={SCREEN_NAME.SPLASH}>
        <Stack.Screen name={SCREEN_NAME.SPLASH} component={SplashScreen} />
        <Stack.Screen name={SCREEN_NAME.ROOT} component={RootScreen} />
        <Stack.Screen name={SCREEN_NAME.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={SCREEN_NAME.SWITCH_ACCOUNT}
          component={SwitchAccountScreen}
        />
        <Stack.Screen
          name={SCREEN_NAME.LOADING_INFO}
          component={LoadingInfoScreen}
        />
        <Stack.Screen
          name={SCREEN_NAME.IMAGE_VIEWER}
          component={ImageViewerScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
          name={SCREEN_NAME.ADD_ACCOUNT}
          component={AddNewAccountScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: false,
          }}
          name={SCREEN_NAME.UPDATE_USER_INFO}
          component={UpdateUserInfoScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
          name={SCREEN_NAME.NEW_POST_MODAL}
          component={NewPostScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackScreens;
