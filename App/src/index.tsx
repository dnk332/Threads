import React, {Fragment} from 'react';
import StackScreens from './navigation/Stack';
import 'react-native-svg';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PortalProvider} from '@gorhom/portal';

import layout from '@themes/layout';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persist} from './redux/store';

const Index = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={layout.fill}>
        <PortalProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
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
