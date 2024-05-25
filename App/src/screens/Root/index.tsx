import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '@screens/Home';
import UserDetail from '@screens/UserDetail';
import Activities from '@screens/Activities';
import SearchScreen from '@screens/Search';

import {colors} from '@themes/index';

import {navigateTo} from '@navigation/NavigationService';
import {SvgComponent} from '@assets/svg';

export type BottomTabsStackParamList = {
  HOME: undefined;
  SEARCH: undefined;
  NEW_POST: undefined;
  ACTIVITIES: undefined;
  USER_DETAIL: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsStackParamList>();

const IconHandle = (iconName: string, focused: boolean = false) => {
  if (!focused) {
    iconName = `${iconName}_inactive`;
  }
  return (
    <SvgComponent
      name={iconName}
      color={focused ? colors.white : colors.shadow}
      size={32}
    />
  );
};

export default function RootScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 0,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={'HOME'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle('HOME', focused);
          },
        }}
      />
      <Tab.Screen
        name={'SEARCH'}
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle('SEARCH', focused);
          },
        }}
      />
      <Tab.Screen
        name={'NEW_POST'}
        component={UserDetail}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle('NEWS', focused);
          },
        }}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigateTo('NEW_POST_MODAL', {focused: true});
          },
        })}
      />
      <Tab.Screen
        name={'ACTIVITIES'}
        component={Activities}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle('ACTIVITY', focused);
          },
          tabBarBadge: '1',
        }}
      />
      <Tab.Screen
        name={'USER_DETAIL'}
        component={UserDetail}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle('USER_DETAIL', focused);
          },
        }}
      />
    </Tab.Navigator>
  );
}
