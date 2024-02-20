import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppContainer from './src/base/AppContainer';

function App() {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
