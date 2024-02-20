import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PdfViewerScreen from '../screens/PdfViewerScreen';
import BookmarkListScreen from '../screens/BookmarkListScreen';
import HomeScreen from '../screens/HomeScreen';

function Stack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PdfViewerScreen"
        component={PdfViewerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookmarkList"
        component={BookmarkListScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default Stack;
