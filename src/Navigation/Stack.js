import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PdfViewerScreen from '../screens/PdfViewerScreen';

function Stack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="PdfViewerScreen">
      <Stack.Screen
        name="PdfViewerScreen"
        component={PdfViewerScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default Stack;
