import React,  { useContext, useState }from 'react';
import { View, StyleSheet, FlatList, TextInput, Button, ScrollView } from 'react-native'
import { Title } from 'react-native-paper';
import { AuthContext } from '../../navigation/AuthProvider';
import { userAuth } from '../../navigation/AuthProvider';
import Layout from './Layout';
import UserItemList from './UserItemList';
import { Divider, List } from 'react-native-paper';
import Dialogs from './Dialogs';

export default function HomeScreen() {

  const { logout } = useContext(AuthContext);
  return (
    <Layout>
      <ScrollView style={{backgroundColor:'#ffffff'}}>
      <Dialogs/>
      </ScrollView>
    </Layout>
  );
}