import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigation/AppNavigator';
import store from './store/index';

// init i18n
import './i18n';
import { subscribeNetwork } from './utils/network';
import { setOnline } from './store/logSlice';

function NetworkProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = subscribeNetwork(isOnline => {
      dispatch(setOnline(isOnline));
    });

    return unsubscribe;
  }, [dispatch]);

  return children;
}

export default function App() {
  return (
    <Provider store={store}>
      <NetworkProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </NetworkProvider>
    </Provider>
  );
}
