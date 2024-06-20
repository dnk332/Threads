import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  UserDetailScreen,
  ActivitiesScreen,
  SearchScreen,
  HomeScreen,
  SettingsScreen,
  // SettingsScreen,
} from '@screens/index';
import {colors} from '@themes/color';
import {navigateTo} from '@navigation/NavigationService';
import SvgComponent from '@svg/index';
import {SVG_NAME} from '@svg/svgList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type BottomTabsStackParamList = {
  HOME: undefined;
  SEARCH: undefined;
  NEW_POST: undefined;
  ACTIVITIES: undefined;
  USER_DETAIL: undefined;

  //SettingsStack
  SETTING_STACK: undefined;
  SETTINGS: undefined;
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
const screenOptions = {
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    backgroundColor: colors.primary,
    borderTopWidth: 0,
  },
  headerShown: false,
  tabBarShowLabel: false,
};

const RootScreen = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
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
        component={UserDetailScreen}
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
        component={ActivitiesScreen}
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
        name={'SETTING_STACK'}
        component={SettingsStackScreen}
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
};

const SettingsStack = createNativeStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={screenOptions}>
      <SettingsStack.Screen name="USER_DETAIL" component={UserDetailScreen} />
      <SettingsStack.Screen name="SETTINGS" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

export default RootScreen;
