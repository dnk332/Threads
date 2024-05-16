import React from 'react';
import StackScreens from './navigation/Stack';
import 'react-native-svg';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SetUpTime} from '@hooks/TimeAgo';

const Index = () => {
  SetUpTime();

  return (
    <SafeAreaProvider>
      <StackScreens />
    </SafeAreaProvider>
  );
};

export default Index;
