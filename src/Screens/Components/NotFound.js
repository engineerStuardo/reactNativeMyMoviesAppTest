import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export const NotFound = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'white',
    }}
  >
    <LottieView
      key='animation'
      autoPlay
      loop
      resizeMode='cover'
      source={require('../../../assets/not-found.json')}
    />
  </View>
);
