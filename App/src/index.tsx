import React from 'react';
import StackScreens from './navigation/Stack';
import 'react-native-svg';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Index = () => {
  return (
    <SafeAreaProvider>
      <StackScreens />
    </SafeAreaProvider>
  );
};

export default Index;
