import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export const LoginInputs = ({
  email,
  setEmail,
  password,
  setPassword,
  login,
}) => (
  <>
    <TextInput
      style={{ marginBottom: 25 }}
      theme={{ colors: { primary: '#F17835' } }}
      label='Email'
      value={email}
      onChangeText={text => setEmail(text)}
      keyboardType={'email-address'}
    />
    <TextInput
      style={{ marginBottom: 25 }}
      theme={{ colors: { primary: '#F17835' } }}
      label='Password'
      value={password}
      onChangeText={text => setPassword(text)}
      secureTextEntry={true}
      onSubmitEditing={login}
    />
    <View style={{ alignSelf: 'center' }}>
      <Button
        style={{ width: 150, backgroundColor: '#F17835' }}
        icon='login'
        mode='contained'
        onPress={login}
      >
        Login
      </Button>
    </View>
  </>
);
