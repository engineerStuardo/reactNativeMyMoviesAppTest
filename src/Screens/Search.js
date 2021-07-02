import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

import { apiSearchURL } from '../../assets/common/baseUrl';

import { MovieList } from '../Screens/Components/MovieList';

export const Search = ({ route }) => {
  const [results, setResults] = useState();
  const text = route.params.text;

  const apiRequest = () => {
    axios
      .get(`${apiSearchURL}${text.toLowerCase()}&page=1&include_adult=false`)
      .then(res => setResults(res.data.results))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    apiRequest();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={results}
        renderItem={({ item, index }) => <MovieList key={item.id} {...item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
