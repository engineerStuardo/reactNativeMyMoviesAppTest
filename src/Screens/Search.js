import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import axios from 'axios';

import { apiSearchURL } from '../../assets/common/baseUrl';

import { MovieList } from '../Screens/Components/MovieList';
import { SearchHeader } from './Components/SearchHeader';
import { SafeArea } from '../Utility/safe-area-component';
import { Loading } from './Components/Loading';
import { NotFound } from './Components/NotFound';
import { TextContainer } from './Styles/SearchStyles';

export const Search = ({ route }) => {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState(route.params.text);

  const apiRequest = async () => {
    try {
      const res = await axios.get(
        `${apiSearchURL}${text.toLowerCase()}&page=1&include_adult=false`
      );
      setResults(res.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    apiRequest();
  }, [text]);

  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <SearchHeader setText={setText} />
        <TextContainer>
          <Text style={{ fontSize: 15 }}>Search movie: </Text>
          <Text style={{ fontSize: 15, color: '#F17835' }}>
            {text.toUpperCase()}
          </Text>
        </TextContainer>
        {loading ? (
          <Loading />
        ) : results.length === 0 ? (
          <NotFound />
        ) : (
          <FlatList
            style={{ backgroundColor: 'white' }}
            data={results}
            renderItem={({ item, index }) => (
              <MovieList key={item.id} {...item} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </SafeArea>
  );
};
