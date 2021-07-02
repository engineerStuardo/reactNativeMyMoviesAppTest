import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import axios from 'axios';

import { apiSearchURL } from '../../assets/common/baseUrl';

import { MovieList } from '../Screens/Components/MovieList';
import { SearchHeader } from './Components/SearchHeader';
import { SafeArea } from '../Utility/safe-area-component';
import { Loading } from './Components/Loading';

export const Search = ({ route }) => {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState(route.params.text);

  const apiRequest = () => {
    axios
      .get(`${apiSearchURL}${text.toLowerCase()}&page=1&include_adult=false`)
      .then(res => {
        setResults(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    apiRequest();
  }, [text]);

  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <SearchHeader setText={setText} />
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={results}
            renderItem={({ item, index }) => (
              <MovieList key={item.id} {...item} />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </SafeArea>
  );
};
