import React from 'react';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export const IconButtonSearch = ({ isHome, search }) => {
  const navigation = useNavigation();

  return (
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
  );
};
