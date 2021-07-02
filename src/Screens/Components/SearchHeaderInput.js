import React from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export const SearchHeaderInput = ({ search, setSearch, isHome, setText }) => {
  const navigation = useNavigation();

  return (
    <TextInput
      mode='outlined'
      style={{ width: '80%', height: 45 }}
      label='Search'
      value={search}
      onChangeText={text => setSearch(text)}
      theme={{ colors: { primary: '#F17835' } }}
      onSubmitEditing={() => {
        if (!search) {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Please enter a movie title',
            text2: 'Please try again',
          });
          return;
        }
        setSearch('');
        isHome
          ? navigation.navigate('Search', { text: search })
          : setText(search);
      }}
    />
  );
};
