import React from 'react';
import StackScreens from './navigation/Stack';
import 'react-native-svg';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SetUpTime} from '@hooks/TimeAgo';
import {layout} from './themes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PortalProvider} from '@gorhom/portal';

const Index = () => {
  SetUpTime();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={layout.fill}>
        <PortalProvider>
          <StackScreens />
        </PortalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Index;
