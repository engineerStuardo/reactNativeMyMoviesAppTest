import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, IconButton, Colors } from 'react-native-paper';
import axios from 'axios';
import { API_KEY } from '@env';

import { apiPopularURL } from '../../assets/common/baseUrl';
import { MovieList } from './Components/MovieList';
import { SearchHeader } from './Components/SearchHeader';
import { SafeArea } from '../Utility/safe-area-component';

const windowWidth = Dimensions.get('window').width;

export const Home = ({ navigation }) => {
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
    <SafeArea>
      <View style={{ flex: 1, width: windowWidth }}>
        <SearchHeader isHome />
        <FlatList
          data={movies}
          renderItem={({ item, index }) => (
            <MovieList key={item.id} {...item} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeArea>
  );
};
