import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { MainNavigator } from './src/Navigators/Main';
import { SafeArea } from './src/Utility/safe-area-component';

export default function App() {
  return (
    <NavigationContainer>
      <SafeArea>
        <MainNavigator />
      </SafeArea>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}
