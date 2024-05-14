import {Text, View} from 'react-native';
import React from 'react';
import SVG_NAME from '@/assets/svgs';

const IconHandle = (iconName: any, focused: boolean) => {
  let iconNameVal = SVG_NAME[iconName];
  let iconInactiveNameVal = SVG_NAME[`INACTIVE_${iconName}`];
  console.log('ICON', {iconNameVal});
  return focused ? <>{iconNameVal}</> : <>{iconInactiveNameVal}</>;
};

const HomeScreenView = () => {
  return (
    <View>
      <Text>HomeScreenView</Text>
      {IconHandle('HOME', true)}
    </View>
  );
};

export default HomeScreenView;
