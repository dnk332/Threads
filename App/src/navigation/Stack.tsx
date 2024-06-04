// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootScreen from '../screens/Root';
import {navigationRef} from './NavigationService';
import ImageViewer from '@screens/ImageViewer';
import NewPost from '@screens/NewPost';

export type NavigationStackParamList = {
  ROOT: undefined;
  IMAGE_VIEWER: {imageLink: string};
  NEW_POST_MODAL: {focused: boolean};
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
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
          name="NEW_POST_MODAL"
          component={NewPost}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackScreens;
