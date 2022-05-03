import React,  { useContext, useState }from 'react';
import { View, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity} from 'react-native'
import { Title } from 'react-native-paper';
import { AuthContext } from '../../navigation/AuthProvider';
import { AntDesign, Feather, Entypo } from '@expo/vector-icons'

export default function Footer({navigation}) {

  const { logout } = useContext(AuthContext);
  return (
      <View style={styles.container}>
	  <TouchableOpacity>
                   <AntDesign name='home' size={28} color='#ffffff' />
        </TouchableOpacity>

		<TouchableOpacity  onPress={async () => await logout()}>
                   <AntDesign name='user' size={28}  color='#ffffff'
                    />
        </TouchableOpacity>
		</View>
  );
}

const styles = StyleSheet.create({
  container: {
    			ustifyContent: 'space-around',
				backgroundColor: '#4E5754',
				padding: 10,
				paddingBottom: 10,
				borderTopLeftRadius: 30,
				borderTopRightRadius: 30,
				borderTopWidth: 1,
				borderRightWidth: 1,
				borderLeftWidth: 1,
				width: '100%',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
  },
});