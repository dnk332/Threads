// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RootScreen from '../screens/Root';
import {navigationRef} from '@navigators';
import {
  ImageViewerScreen,
  LoginScreen,
  NewPostScreen,
  SwitchAccountScreen,
  AddNewAccountScreen,
  SplashScreen,
  LoadingInfoScreen,
} from '@screens/index';

export type NavigationStackParamList = {
  ROOT: undefined;
  IMAGE_VIEWER: {imageLink: string};
  NEW_POST_MODAL: {focused: boolean};
  LOGIN: undefined;
  SWITCH_ACCOUNT: undefined;
  ADD_ACCOUNT: undefined;
  SPLASH: undefined;
  LOADING_INFO: undefined;
};

const Stack = createNativeStackNavigator<NavigationStackParamList>();

function StackScreens() {
  return (
    <NavigationContainer
      ref={ref => {
        navigationRef.current = ref;
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SPLASH">
        <Stack.Screen name={'SPLASH'} component={SplashScreen} />
        <Stack.Screen name={'ROOT'} component={RootScreen} />
        <Stack.Screen name={'LOGIN'} component={LoginScreen} />
        <Stack.Screen name={'SWITCH_ACCOUNT'} component={SwitchAccountScreen} />
        <Stack.Screen name={'LOADING_INFO'} component={LoadingInfoScreen} />
        <Stack.Screen name="IMAGE_VIEWER" component={ImageViewerScreen} />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
          name="ADD_ACCOUNT"
          component={AddNewAccountScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
          name="NEW_POST_MODAL"
          component={NewPostScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackScreens;
