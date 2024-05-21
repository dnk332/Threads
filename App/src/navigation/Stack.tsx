// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootScreen from '../screens/Root';
import {navigationRef} from './NavigationService';
import ImageViewer from '@screens/ImageViewer';

export type NavigationStackParamList = {
  ROOT: undefined;
  IMAGE_VIEWER: {imageLink: string};
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
        initialRouteName="ROOT">
        <Stack.Screen name="ROOT" component={RootScreen} />
        <Stack.Screen name="IMAGE_VIEWER" component={ImageViewer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackScreens;
