import React, { useState, useCallback } from 'react';
import { View, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { baseURL } from '../../assets/common/baseUrl';
import { Loading } from './Components/Loading';
import { LoginInputs } from './Components/LoginInputs';
import {
  AccountBackground,
  TransparentContainer,
  MainContainer,
  LottieViewContainer,
  FormContainer,
  FormInnerContainer,
} from './Styles/LoginStyles';

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
      AsyncStorage.getItem('token')
        .then(res => {
          res ? navigation.navigate('Home') : setLoading(false);
        })
        .catch(error => console.log(error));
    }, [])
  );

  if (loading) {
    return (
      <AccountBackground>
        <TransparentContainer windowWidth={windowHeight}>
          <Loading />
        </TransparentContainer>
      </AccountBackground>
    );
  }

  return (
    <AccountBackground>
      <TransparentContainer windowWidth={windowHeight}>
        <MainContainer windowHeight={windowHeight}>
          <LottieViewContainer>
            <LottieView
              key='animation'
              autoPlay
              loop
              resizeMode='cover'
              source={require('../../assets/movie.json')}
            />
          </LottieViewContainer>
          <FormContainer>
            <FormInnerContainer windowWidth={windowHeight}>
              <LoginInputs
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                login={login}
              />
            </FormInnerContainer>
          </FormContainer>
        </MainContainer>
      </TransparentContainer>
    </AccountBackground>
  );
};
