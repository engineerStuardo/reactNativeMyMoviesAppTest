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
import LottieView from 'lottie-react-native';

import { baseURL } from '../../assets/common/baseUrl';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validation = () => {
    if (email === '' || password === '') {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please enter credentials',
        text2: 'Please try again',
      });
      setLoading(false);
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
        setLoading(false);
        AsyncStorage.setItem('token', res.data.token);
        navigation.navigate('Home');
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'User not authorized',
        text2: 'Please try again',
      });
    }
  };

  const login = () => {
    setLoading(true);
    if (validation() === '') return;
    apiRequest();
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      AsyncStorage.removeItem('token')
        .then(res => {
          AsyncStorage.getItem('token')
            .then(res => {
              console.log(res);
              setLoading(false);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
      // AsyncStorage.getItem('token')
      //   .then(res => {
      //     res ? navigation.navigate('Home') : setLoading(false);
      //   })
      //   .catch(error => console.log(error));
    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          animating={true}
          color={Colors.orange800}
          size={'large'}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // height: windowHeight / 3,
        // backgroundColor: 'orange',
        marginTop: windowHeight / 10,
      }}
    >
      <View
        style={{
          width: 150,
          height: 150,
          position: 'absolute',
          top: 35,
          left: 100,
        }}
      >
        <LottieView
          key='animation'
          autoPlay
          loop
          resizeMode='cover'
          source={require('../../assets/movie.json')}
        />
      </View>
      <View style={{ flex: 1, marginTop: 165, alignSelf: 'center' }}>
        <View
          style={{
            width: windowWidth / 1.3,
            backgroundColor: 'white',
            padding: 40,
          }}
        >
          {/* <Text style={{ fontSize: 20, marginBottom: 20 }}>Login</Text> */}
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
            onSubmitEditing={login}
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
    </View>
  );
};
