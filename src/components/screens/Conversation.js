import React, { useEffect, useState } from 'react'
import {View,StyleSheet,Text,ScrollView,TextInput,TouchableOpacity} from 'react-native'
import { IconButton, Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Layout from './Layout'
import Message from './Message'
import { useRoute } from '@react-navigation/core'
import {onSnapshot,collection,addDoc,serverTimestamp,query,orderBy, doc ,getDoc} from 'firebase/firestore'
import { db } from '../../navigation/firebaseConf';
import { userAuth } from '../../navigation/AuthProvider'
import { AntDesign } from '@expo/vector-icons'; 
import { Header as HeaderRNE, HeaderProps, } from 'react-native-elements';
import { Input, Button } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Crypt, RSA } from 'hybrid-crypto-js';



const Conversation = ({route,navigation}) => {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	const [prvtKey, setprvtKey] = useState('')
	const { user } = userAuth()
	var crypt = new Crypt({});

	const getData = async (key) => {
		try {
		  const value = await AsyncStorage.getItem(key)
		  if(value !== null) {
			return value;
		  }
		} catch(e) {
		  // error reading value
		}
	  }

	const prvtKey2 = async() =>{
		const value = await getData('prvt'+user.uid).then((result) => {return result})
		if(value !== null) {
			return value;
			}
		}

	async function GetPrvtKey(){
		var a = await prvtKey2()
		setprvtKey(a)
		}

	GetPrvtKey()

	const {chatId, usr_name} = route.params

	const sendMessage = async () => {

		const getConvPubKey = await getDoc(doc(db, 'Usrs', chatId))
		var pubKeyConv;

		if(getConvPubKey.exists()) {

			pubKeyConv=getConvPubKey.data().pubKey
		}

		const GetPublicKey = await getData('pub'+user.uid).then((result) => {return result})

		const publicKey = await GetPublicKey;

		if (message.length > 0) {

		try {
			var encrypted = await crypt.encrypt([publicKey,pubKeyConv], message);
			//var decrypted = messages
			//console.log('decrypted.message'+decrypted)

			await addDoc(collection(db, 'Usrs', user.uid, 'ChatRoom', chatId, 'Messages'), {
                timestamp: serverTimestamp(),
				userId: user.uid,
				text: encrypted,
             });
			 await addDoc(collection(db, 'Usrs', chatId, 'ChatRoom', user.uid, 'Messages'), {
                timestamp: serverTimestamp(),
				userId: user.uid,
				text: encrypted,
             });
			 setMessage('')
			}
		 catch (error) {
			alert(error)
		}
		setMessage('')
	}
	}
	
	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'Usrs', user.uid, 'ChatRoom', chatId, 'Messages'), orderBy('timestamp', 'asc')),
				snapshot => {
					setMessages(
						snapshot.docs.map(doc => ({
							id: doc.id,
							text:doc.data().text,
							...doc.data(),
						}))
					)
				}
			),
		[]
	)

	


	return (
		<Layout>
		<HeaderRNE
          containerStyle={{
            backgroundColor: '#4E5754',
            justifyContent: 'space-around',
          }}
          centerComponent={<Title style={styles.heading}>{usr_name}</Title>}
          leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
                name='back'
                size={30}
                color='#ffffff'
            />
        </TouchableOpacity>}>
        
      </HeaderRNE>

			<View style={{  padding: 20, flex: 1}}>
				<ScrollView style={{ height: '75%', flexDirection: 'column-reverse' }}>
					{messages.map(message => (
						<Message key={message.timestamp} message={message} prvtKey={prvtKey} />
					))}
				</ScrollView>

				<View style={{flexDirection:'row'}}>
					<TextInput
						placeholder='Enter your message'
						onChangeText={setMessage}
						value={message}
						style={{
							height: 40,
							padding: 10,
							backgroundColor: '#fff',
							borderRadius: 15,
							width: '90%',
						}}
					/>
					<TouchableOpacity onPress={() => sendMessage()}>
					<AntDesign
						name='back'
						size={30}
						color='#ffffff'
					/>
				</TouchableOpacity>
				</View>
			</View>
		</Layout>
	)
}

export default Conversation

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