import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SVG_NAME from '@/assets/svgs';
import {ROOT_SCREEN} from '@/navigation/ScreenName';

import HomeScreen from '../Home';
import UserDetail from '../UserDetail';

import {colors} from '@/themes';

const Tab = createBottomTabNavigator();

const IconHandle = (activeIc: any, inActiveIc: any, focused: boolean) => {
  return focused ? activeIc : inActiveIc;
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
            return IconHandle(
              <SVG_NAME.HOME />,
              <SVG_NAME.INACTIVE_HOME />,
              focused,
            );
          },
        }}
      />
      <Tab.Screen
        name={ROOT_SCREEN.SEARCH}
        component={UserDetail}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle(
              <SVG_NAME.SEARCH />,
              <SVG_NAME.INACTIVE_SEARCH />,
              focused,
            );
          },
        }}
      />
      <Tab.Screen
        name={ROOT_SCREEN.NEWS}
        component={UserDetail}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle(<SVG_NAME.NEWS />, <SVG_NAME.NEWS />, focused);
          },
        }}
      />
      <Tab.Screen
        name={ROOT_SCREEN.LIKE}
        component={UserDetail}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle(
              <SVG_NAME.LIKE />,
              <SVG_NAME.INACTIVE_LIKE />,
              focused,
            );
          },
        }}
      />
      <Tab.Screen
        name={ROOT_SCREEN.USER_DETAIL}
        component={UserDetail}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle(
              <SVG_NAME.USER />,
              <SVG_NAME.INACTIVE_USER />,
              focused,
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
