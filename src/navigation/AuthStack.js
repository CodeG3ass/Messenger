import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from '../components/screens/LoginScreen';
import SignupScreen from '../components/screens/SignupScreen';
import HomeScreen from '../components/screens/HomeScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

      </Stack.Navigator>
  );
}