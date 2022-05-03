import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider';
import { userAuth } from '../../navigation/AuthProvider';

const UserItemList = ({ conversation}) => {
	const navigation = useNavigation()
	const { user } = userAuth()

	//console.log("user?.uid "+ user?.uid)
	//console.log("conversation.userId "+)
	//if (user?.uid === conversation.userId) return null

	if (user?.uid === conversation._id) return null

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('Conversation', { chatId:conversation._id, usr_name:conversation.name})
			}
			style={{
				marginBottom: 25,
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
			<Image
				source={{ uri: conversation.image }}
				style={{ width: 50, height: 50, borderRadius: 50 }}
			/>
			<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center', marginLeft: 8 }}>
				<View style={{ marginBottom: 8 }}>
					<Text style={{ color: '#4E5754', fontWeight: 'bold' }}>
						{conversation.name}
					</Text>
					<Text style={{ color: '#34as' }}>{conversation.time}</Text>
				</View>
				<View>
					<Text style={{ color: '#4E5754' }}>{conversation.text}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default UserItemList
