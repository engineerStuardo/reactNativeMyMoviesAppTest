import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, IconButton, Colors } from 'react-native-paper';

export const Home = ({ navigation }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        console.log('This is the token: ' + token);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{ width: 300, height: 55 }}
          label='Search'
          value={search}
          onChangeText={text => setSearch(text)}
        />
        <IconButton
          icon='calendar-search'
          color={Colors.red500}
          size={30}
          onPress={() => console.log('Pressed')}
        />
      </View>
    </View>
  );
};
