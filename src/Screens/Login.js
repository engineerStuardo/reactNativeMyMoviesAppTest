import React, { useState, useCallback } from 'react';
import { View, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import { baseURL } from '../../assets/common/baseUrl';
import { Loading } from './Components/Loading';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const AccountBackground = styled.ImageBackground.attrs({
  source: require('../../assets/background.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

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
      <AccountBackground>
        <View
          style={{
            width: windowWidth,
            height: windowHeight,
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
          }}
        >
          <Loading />
        </View>
      </AccountBackground>
    );
  }

  return (
    <AccountBackground>
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: 'rgba(255, 255, 255, 0.35)',
        }}
      >
        <View
          style={{
            flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            // height: windowHeight / 3,
            // backgroundColor: 'orange',

            marginTop: windowHeight / 9,
            paddingTop: windowHeight / 135,
          }}
        >
          <View
            style={{
              width: 150,
              height: 150,
              position: 'absolute',
              top: '6.5%',
              left: '33%',
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
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
      </View>
    </AccountBackground>
  );
};
