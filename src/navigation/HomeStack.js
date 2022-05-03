import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import HomeScreen from '../components/screens/HomeScreen';
import Conversation from '../components/screens/Conversation'
import StartConversation from '../components/screens/StartConversation';
import {TouchableOpacity,StyleSheet} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Header as HeaderRNE, HeaderProps, } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const ChatStack = createStackNavigator();

export default function HomeStack() {
  return (
      <Stack.Navigator presentation="modal" headerMode="none">
        <Stack.Screen name="ChatApp" component={ChatComponent} />
        <Stack.Screen name="Conversation" component={Conversation} />
        <Stack.Screen name="StartConversation" component={StartConversation} />
      </Stack.Navigator>
  );
}

function ChatComponent() {
  return (
      <ChatStack.Navigator
          screenOptions={{
            titleStyle: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },
            title: 'Контакты',
            headerStyle: {
              backgroundColor: '#4E5754',
              height: 55,
            },
            headerTintColor:
             '#ffffff',
            headerTitleStyle: {
              fontSize: 20,
              alignSelf: 'center'
            },
          }}
      >
        <ChatStack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity  style={{margin:10}} onPress={() => navigation.navigate('StartConversation')}>
                   <AntDesign name="pluscircleo"
                      size={20}
                      color="#fff"
                    />
                </TouchableOpacity>
              ),
            })}
        />
      </ChatStack.Navigator>
  );
}