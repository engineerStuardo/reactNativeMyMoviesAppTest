import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { TextInput, IconButton, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;

export const SearchHeader = ({ isHome, setText }) => {
  const [search, setSearch] = useState('');

  const navigation = useNavigation();

  return (
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
      <IconButton
        icon='calendar-search'
        color={'#F17835'}
        size={30}
        onPress={() => {
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
    </View>
  );
};
