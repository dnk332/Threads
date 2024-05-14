import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './Home';
import UserDetail from './UserDetail';

const Tab = createMaterialBottomTabNavigator();

export default function RootScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{backgroundColor: 'tomato'}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // options={{
        //   tabBarIcon: ({color}) => (
        //     <MaterialCommunityIcons name="home" color={color} size={26} />
        //   ),
        // }}
      />
      <Tab.Screen
        name="UserDetail"
        component={UserDetail}
        // options={{
        //   tabBarIcon: ({color}) => (
        //     <MaterialCommunityIcons name="account" color={color} size={26} />
        //   ),
        // }}
      />
      <Tab.Screen name="Settings" component={UserDetail} />
    </Tab.Navigator>
  );
}
