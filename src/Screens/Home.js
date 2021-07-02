import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, IconButton, Colors } from 'react-native-paper';
import axios from 'axios';
import { API_KEY, API_URL } from '@env';

export const Home = ({ navigation }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    //https://api.themoviedb.org/3/movie/popular?api_key=949eb751d5ca24f1d34b3041669ce02f&language=en-US&page=1
    axios
      .get(`${API_URL}${API_KEY}&language=en-US&page=1`)
      .then(res => {
        console.log(res.request._response);
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
