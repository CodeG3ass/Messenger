import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { userAuth } from '../../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Crypt, RSA } from 'hybrid-crypto-js';

const Message = ({ message, prvtKey }) => {
	const { user } = userAuth()
	var crypt = new Crypt({});
	const isMsgByAuthUser = user.uid === message.userId
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				borderRadius: 20,
				paddingVertical: 6,
				paddingHorizontal: 10,
				alignSelf: isMsgByAuthUser ? 'flex-end' : 'flex-start',
				marginBottom: 20,
			}}
		>
			<Image
				source={{ uri: 'https://legamart.com/avatars/Bruce.jpg' }}
				style={{ width: 25, height: 25, borderRadius: 25, marginRight: 6 }}
			/>
			<Text style={{ color: '#43f3', fontSize: 16 }}>{crypt.decrypt(prvtKey,message.text).message}</Text>
		</View>
	)
}

export default Message
