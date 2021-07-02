import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { MainNavigator } from './src/Navigators/Main';

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
      <Toast ref={ref => Toast.setRef(ref)} />
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}
