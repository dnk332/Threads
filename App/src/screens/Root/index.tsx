import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '@screens/Home';
import UserDetail from '@screens/UserDetail';
import Activities from '@screens/Activities';
import SearchScreen from '@screens/Search';

import {colors} from '@themes/index';

import {navigateTo} from '@navigation/NavigationService';
import {SvgComponent} from '@assets/svg';
import {SVG_NAME} from '@assets/svg/svgList';

export type BottomTabsStackParamList = {
  HOME: undefined;
  SEARCH: undefined;
  NEW_POST: undefined;
  ACTIVITIES: undefined;
  USER_DETAIL: undefined;
};

interface IconHandleProps {
  iconName: keyof typeof SVG_NAME;
  iconNameInactive: keyof typeof SVG_NAME;
  focused?: boolean;
}

const Tab = createBottomTabNavigator<BottomTabsStackParamList>();

const IconHandle = ({
  iconName,
  iconNameInactive,
  focused = false,
}: IconHandleProps) => {
  return (
    <SvgComponent
      name={focused ? iconName : iconNameInactive}
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
            return IconHandle({
              iconName: 'HOME',
              iconNameInactive: 'HOME_INACTIVE',
              focused,
            });
          },
        }}
      />
      <Tab.Screen
        name={'SEARCH'}
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle({
              iconName: 'SEARCH',
              iconNameInactive: 'SEARCH_INACTIVE',
              focused,
            });
          },
        }}
      />
      <Tab.Screen
        name={'NEW_POST'}
        component={UserDetail}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle({
              iconName: 'NEWS',
              iconNameInactive: 'NEWS_INACTIVE',
              focused,
            });
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
            return IconHandle({
              iconName: 'ACTIVITY',
              iconNameInactive: 'ACTIVITY_INACTIVE',
              focused,
            });
          },
          tabBarBadge: '1',
        }}
      />
      <Tab.Screen
        name={'USER_DETAIL'}
        component={UserDetail}
        options={{
          tabBarIcon: ({focused}) => {
            return IconHandle({
              iconName: 'USER_DETAIL',
              iconNameInactive: 'USER_DETAIL_INACTIVE',
              focused,
            });
          },
        }}
      />
    </Tab.Navigator>
  );
}
