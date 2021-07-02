import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import axios from 'axios';
import { API_KEY } from '@env';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { apiPopularURL } from '../../assets/common/baseUrl';
import { MovieList } from './Components/MovieList';
import { SearchHeader } from './Components/SearchHeader';
import { SafeArea } from '../Utility/safe-area-component';
import { Loading } from './Components/Loading';

const windowWidth = Dimensions.get('window').width;

export const Home = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const requestApi = async () => {
    try {
      const res = await axios.get(
        `${apiPopularURL}${API_KEY}&language=en-US&page=1`
      );
      const response = await JSON.parse(res.request._response);
      setMovies(response.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    requestApi();
  }, []);

  const logout = () => {
    AsyncStorage.removeItem('token')
      .then(res => {
        navigation.navigate('Login');
      })
      .catch(error => console.log(error));
  };

  return (
    <SafeArea>
      <View style={{ flex: 1, width: windowWidth }}>
        <SearchHeader isHome />
        <Button
          style={{ margin: 20, marginTop: 0, backgroundColor: '#F17835' }}
          icon='logout'
          mode='contained'
          onPress={logout}
        >
          Logout
        </Button>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            style={{ backgroundColor: 'white' }}
            data={movies}
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
