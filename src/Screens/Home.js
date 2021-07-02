import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, IconButton, Colors } from 'react-native-paper';
import axios from 'axios';
import { API_KEY } from '@env';

import { apiPopularURL } from '../../assets/common/baseUrl';
import { MovieList } from './Components/MovieList';

const windowWidth = Dimensions.get('window').width;

export const Home = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiPopularURL}${API_KEY}&language=en-US&page=1`)
      .then(res => {
        const response = JSON.parse(res.request._response);
        setMovies(response.results);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={{ flex: 1, width: windowWidth }}>
      <View
        style={{
          width: windowWidth,
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{ width: '80%', height: 55 }}
          label='Search'
          value={search}
          onChangeText={text => setSearch(text)}
        />
        <IconButton
          icon='calendar-search'
          color={Colors.red500}
          size={30}
          onPress={() => navigation.navigate('Search', { text: search })}
        />
      </View>
      <FlatList
        data={movies}
        renderItem={({ item, index }) => <MovieList key={item.id} {...item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
