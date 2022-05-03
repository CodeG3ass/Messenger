import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native'
import { IconButton, Title } from 'react-native-paper';
import { Input, Button } from 'react-native-elements';
import { AuthContext } from '../../navigation/AuthProvider';


export default function SignupScreen({ navigation }) {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const { register, loading } = useContext(AuthContext);
  
    if (loading) {
      return <Loading />;
    }
  
    return (
        <View style={styles.container}>
          <Title style={styles.titleText}>Let's get started!</Title>
          <TextInput
              style={styles.input}
              labelName="Display Name"
              placeholder='Enter your Name'
              value={displayName}
              autoCapitalize="none"
              onChangeText={(userDisplayName) => setDisplayName(userDisplayName)}
          />
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
              placeholder='Enter your Password'
              value={password}
              secureTextEntry={true}
              onChangeText={(userPassword) => setPassword(userPassword)}
          />
          <Button
              title="Sign up"
              modeValue="contained"
              labelStyle={styles.button}
              onPress={() => register(displayName, email, password)}
          />
          <IconButton
              icon="keyboard-backspace"
              size={30}
              style={styles.navButton}
              color="#5b3a70"
              onPress={() => navigation.goBack()}
          />
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      fontSize: 24,
      marginBottom: 10,
    },
    button: {
      fontSize: 77,
      marginTop: 10,
      marginBottom: 10,
      width: 200,
      marginTop: 10,
    },
    navButtonText: {
      fontSize: 18,
    },
    navButton: {
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