import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../Screens/Login';
import { Home } from '../Screens/Home';
import { Search } from '../Screens/Search';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Search'
        component={Search}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
