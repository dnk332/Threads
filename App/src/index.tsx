import React, {Fragment} from 'react';
import StackScreens from './navigation/Stack';
import 'react-native-svg';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PortalProvider} from '@gorhom/portal';
import Toast from 'react-native-toast-message';

import layout from '@themes/layout';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@store';
import {toastConfig} from '@utils/ToastConfig';

const Index = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={layout.fill}>
        <PortalProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Fragment>
                <StackScreens />
                <Toast
                  topOffset={47}
                  config={toastConfig}
                  autoHide={false}
                  position={'bottom'}
                  bottomOffset={100}
                />
              </Fragment>
            </PersistGate>
          </Provider>
        </PortalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Index;
