import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native'
import { IconButton, Title } from 'react-native-paper';
import { Input, Button } from 'react-native-elements';
import { AuthContext } from '../../navigation/AuthProvider';


export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const { login, loading } = useContext(AuthContext);
  
    return (
      <View style={styles.container}>
      <Title style={styles.titleText}>Welcome!</Title>
      <TextInput
          style={styles.input}
          labelName="Email"
          placeholder='Enter your Email'
          value={email}
          autoCapitalize="none"
          onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <TextInput
         style={styles.input}
          labelName="Password"
          placeholder='Enter your password'
          value={password}
          secureTextEntry={true}
          onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <Button
          style={styles.button}
          title="Login"
          modeValue="contained"
          onPress={async () => await login(email, password)} 
      />
      <Button
          style={styles.button}

          title="Sign up here"
          modeValue="text"
          uppercase={false}
          onPress={() => navigation.navigate('Signup')}
      />
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      fontSize: 24,
      marginBottom: 10,
      margin: 10,
    },
    button: {
      fontSize: 77,
      marginTop: 10,
      marginBottom: 10,
      width: 200,
      marginTop: 10,
    },
    input: {
      backgroundColor: '#B5B8B1',
      marginBottom: 20,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#333',
      borderRadius: 8,
      padding: 12
    }
  });