import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ROOT_SCREEN} from '../../navigation/ScreenName';

import HomeScreen from '../Home';
import UserDetail from '../UserDetail';

import {colors} from '../../themes/index';
import {SVGName} from '../../assets/svg/index';

const Tab = createBottomTabNavigator();

const IconHandle = (iconName: string, focused: boolean = true) => {
  return <SVGName title={iconName} isInactive={focused} />;
};

export default function RootScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.primary,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}
      initialRouteName={ROOT_SCREEN.HOME}>
      <Tab.Screen
        name={ROOT_SCREEN.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle(ROOT_SCREEN.HOME, focused);
          },
        }}
      />
      <Tab.Screen
        name={ROOT_SCREEN.SEARCH}
        component={UserDetail}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle(ROOT_SCREEN.SEARCH, focused);
          },
        }}
      />
      <Tab.Screen
        name={ROOT_SCREEN.NEWS}
        component={UserDetail}
        options={{
          tabBarIcon: ({}) => {
            return IconHandle(ROOT_SCREEN.NEWS);
          },
        }}
      />
      <Tab.Screen
        name={ROOT_SCREEN.LIKE}
        component={UserDetail}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle(ROOT_SCREEN.LIKE, focused);
          },
        }}
      />
      <Tab.Screen
        name={ROOT_SCREEN.USER_DETAIL}
        component={UserDetail}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle(ROOT_SCREEN.USER_DETAIL, focused);
          },
        }}
      />
    </Tab.Navigator>
  );
}
