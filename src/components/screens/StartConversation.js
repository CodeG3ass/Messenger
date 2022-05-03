import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { IconButton, Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {onSnapshot,collection,addDoc,serverTimestamp,query,orderBy, where, getDocs, doc, setDoc} from 'firebase/firestore'
import { db } from '../../navigation/firebaseConf';
import { Header as HeaderRNE, HeaderProps, } from 'react-native-elements';
import { Input, Button } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { userAuth } from '../../navigation/AuthProvider';


export default function StartConversation({ navigation }) {
  const [userEmail, setUserEmail] = useState('');
  const { user } = userAuth()
  const [doc_id, setDocId] = useState('');

  async function AddUser(user_uid, email) {
    const citiesRef = collection(db, 'Usrs');
    await setDoc(doc(citiesRef, user_uid), {
      email: email });
  }

  async function handleButtonPress() {
    if (userEmail.length > 0) {
        const museums = query(collection(db, 'Usrs'), where('email', '==', userEmail));
        const querySnapshot = await getDocs(museums);
        if(!querySnapshot.empty) {
            querySnapshot.forEach((doc) => { setDocId(doc.id);});
            console.log(doc_id);
            //addDoc(collection(db, 'Usrs', user.uid, 'ChatRoom', doc_id, 'Messages'), { });

            const chatRoomCreation = collection(db, 'Usrs', user.uid, 'ChatRoom'); 
            await setDoc(doc(chatRoomCreation, doc_id), {  
                latestMessage: {
                text: '',
                createdAt: serverTimestamp()
              },
            name: userEmail });

            const chatRoomConversationCreation = collection(db, 'Usrs', doc_id, 'ChatRoom'); 
            await setDoc(doc(chatRoomConversationCreation, user.uid), {  
                latestMessage: {
                text: '',
                createdAt: serverTimestamp()
              },
            name: user.email });

            addDoc(collection(db, 'Usrs', user.uid, 'ChatRoom', doc_id, 'Messages'), {
                titimestamp: serverTimestamp(),
				userId: user.uid,
				text: '',
             });

            addDoc(collection(db, 'Usrs', doc_id, 'ChatRoom', user.uid, 'Messages'), {
                titimestamp: serverTimestamp(),
				userId: user.uid,
				text: '',
             });
      //  querySnapshot.forEach((doc) => {
      //      console.log(doc.id, ' => ', doc.data());
     //   });
        //const snap = await getDoc(doc(db, 'Usrs', user.uid))
    }
  }
  }
  return (
      <View style={styles.rootContainer}>
        <HeaderRNE
          containerStyle={{
            backgroundColor: '#4E5754',
            justifyContent: 'space-around',
          }}
        style={{backgroundColor: '#5bf',}}
          centerComponent={{ text: 'Новый чат', style: styles.heading }}
          leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
                name='undo'
                size={30}
                color='#ffffff'
            />
        </TouchableOpacity>}>
        
      </HeaderRNE>
        <View style={styles.closeButtonContainer}>
        </View>
        <View style={styles.innerContainer}>
          <Title style={styles.title}>Create a new channel</Title>
          <TextInput
             style={styles.input}
              labelName="Channel Name"
              color="#5b3a70"
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
              clearButtonMode="while-editing"
          />
          <Button
              style={styles.button}
              title="Create"
              modeValue="contained"
              labelStyle={styles.buttonLabel}
              onPress={() => handleButtonPress()}
              disabled={userEmail.length === 0}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 22,
  },
  input: {
    backgroundColor: '#fff',
    margin: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12
  },
  button: {
    fontSize: 77,
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    marginTop: 10
  },
});