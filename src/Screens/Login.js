import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  TextInput,
  Button,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { baseURL } from '../../assets/common/baseUrl';

const windowWidth = Dimensions.get('window').width;

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validation = () => {
    if (email === '' || password === '') {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please enter credentials',
        text2: 'Please try again',
      });
      return '';
    }
  };

  const apiRequest = async () => {
    const body = {
      email: email.toLowerCase(),
      password,
    };
    try {
      const res = await axios.post(baseURL, body);
      if (res.status === 200) {
        AsyncStorage.setItem('token', res.data.token);
        navigation.navigate('Home');
      }
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'User not authorized',
        text2: 'Please try again',
      });
    }
  };

  const login = () => {
    if (validation() === '') return;
    apiRequest();
  };

  return (
    <View style={{ flex: 1, marginTop: 150, alignSelf: 'center' }}>
      <View
        style={{
          width: windowWidth / 1.3,
          backgroundColor: 'white',
          padding: 40,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Login</Text>
        <TextInput
          style={{ marginBottom: 25 }}
          label='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType={'email-address'}
        />
        <TextInput
          style={{ marginBottom: 25 }}
          label='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <View style={{ alignSelf: 'center' }}>
          <Button
            style={{ width: 150 }}
            icon='login'
            mode='contained'
            onPress={login}
          >
            Login
          </Button>
        </View>
      </View>
    </View>
  );
};
