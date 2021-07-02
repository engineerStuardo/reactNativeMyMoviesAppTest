import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

import { apiSearchURL } from '../../assets/common/baseUrl';

import { MovieList } from '../Screens/Components/MovieList';
import { SearchHeader } from './Components/SearchHeader';
import { SafeArea } from '../Utility/safe-area-component';

export const Search = ({ route }) => {
  const [results, setResults] = useState();
  const [text, setText] = useState(route.params.text);

  const apiRequest = () => {
    axios
      .get(`${apiSearchURL}${text.toLowerCase()}&page=1&include_adult=false`)
      .then(res => setResults(res.data.results))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    apiRequest();
  }, [text]);

  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <SearchHeader setText={setText} />
        <FlatList
          data={results}
          renderItem={({ item, index }) => (
            <MovieList key={item.id} {...item} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeArea>
  );
};
