import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppContainer from './src/base/AppContainer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
          <AppContainer />
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
