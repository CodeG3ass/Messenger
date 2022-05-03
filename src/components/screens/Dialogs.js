import React,  { useContext, useState, useEffect }from 'react';
import { View, StyleSheet, FlatList, TextInput, Button, ScrollView } from 'react-native'
import { Title } from 'react-native-paper';
import { AuthContext } from '../../navigation/AuthProvider';
import { userAuth } from '../../navigation/AuthProvider';
import Layout from './Layout';
import UserItemList from './UserItemList';
import { Divider, List } from 'react-native-paper';
import {onSnapshot,collection,addDoc,serverTimestamp,query,orderBy, wh} from 'firebase/firestore'
import { db } from '../../navigation/firebaseConf';

export default function Dialogs() {
	const { user } = userAuth()
	const [chatrooms, setThreads] = useState([])
	const [loading, setLoading] = useState(true)
	const [input_Value, setValue] = useState('')

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'Usrs', user.uid, 'ChatRoom')),
				snapshot => {
					setThreads(
						snapshot.docs.map(doc => ({
							_id: doc.id,
							userId: user.uid,
							name: doc.name,
							latestMessage: { text: '' },
							...doc.data(),
						}))					
					);
				}
				
			),
		[]
	)
	//console.log(chatrooms)

	const filtred_users = chatrooms.filter(users=> {
		return users.name.toLowerCase().includes(input_Value.toLowerCase())
	})

  return (
	<View>
		<View>
		  <TextInput
			placeholder='Поиск'
			name='filtred_contacts'
			onChange={(event)=> setValue(event.target.value)}
			style={{
				height: 20,
				marginTop: 5,
				marginBottom: 5,
				padding: 10,
				borderWidth: 1,
      			borderColor: '#333',
				borderRadius: 7,
				width: '100%',
			}}
		/>
	  </View>
    <View style={{
				borderRadius: 25,
				marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
			}}>
			{filtred_users.map(chatroom => (
				<UserItemList key={chatroom.name} conversation={chatroom} />
			))}
		</View>
	</View>
		
  );
}