import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { userAuth } from './AuthProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack'

export default function Routes() {
  const { user } = userAuth()
  return (
      <NavigationContainer>
         {user ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
  );
}