import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, marginTop: 150, alignSelf: 'center' }}>
      <View
        style={{
          width: 350,
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
        <Button
          style={{ width: 150 }}
          icon='login'
          mode='contained'
          onPress={() => console.log('Pressed')}
        >
          Login
        </Button>
      </View>
    </View>
  );
};
