import React, {Fragment, useEffect} from 'react';
import StackScreens from './navigation/Stack';
import 'react-native-svg';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SetUpTime} from '@hooks/TimeAgo';
import {layout} from '@themes/index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PortalProvider} from '@gorhom/portal';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/store';

const Index = () => {
  useEffect(() => {
    SetUpTime();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={layout.fill}>
        <PortalProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Fragment>
                <StackScreens />
              </Fragment>
            </PersistGate>
          </Provider>
        </PortalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Index;
