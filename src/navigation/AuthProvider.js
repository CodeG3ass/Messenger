import React, { createContext, useContext, useState, useEffect, useMemo, } from 'react';
import { firebase, auth, login, logout } from './firebaseConf';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { onAuthStateChanged } from '@firebase/auth'
import {onSnapshot,collection,addDoc,serverTimestamp,query,orderBy, doc, setDoc} from 'firebase/firestore'
import { db } from './firebaseConf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Crypt, RSA } from 'hybrid-crypto-js';





export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const storeData = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value)
      } catch (e) {
        // saving error
      }
    }

    var rsa = new RSA({keySize: 1024,});

    const GenKeyPair = rsa.generateKeyPairAsync().then(keyPair =>{ return keyPair});

    async function AddUser(user_uid, email) {

      const keyPair = await GenKeyPair;
      
      try {
            const citiesRef = collection(db, 'Usrs');
            await setDoc(doc(citiesRef, user_uid), { email: email, pubKey: keyPair.publicKey});
            const chatRoomsCreation = collection(db, 'Usrs', user_uid, 'ChatRoom'); 
            await setDoc(doc(chatRoomsCreation, user_uid), {  
                latestMessage: {
                  text: '',
                  createdAt: serverTimestamp()
                },
              name: email });
      }
      catch (e) {
        console.log(e);
      }
      finally{
        storeData('pub'+user_uid,  keyPair.publicKey)
        storeData('prvt'+user_uid,  keyPair.privateKey)
      }
    }


    useEffect(
		() =>
			onAuthStateChanged(auth, user => {
				if (user) {
					setUser({
						...user,
					})
				} else {
					setUser(null)
				}

				setLoading(false)
			}),

		[]
	)



    return (
        <AuthContext.Provider
            value={{
              user,
              loading,
              register: async (name, email, password) => {
                try {
                   createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {displayName: name,
                    })
                    .then(() => { alert(userCredential.user.uid);
                      AddUser(userCredential.user.uid, userCredential.user.email);
                      storeData('userCredential.user.uid', email)
                    })
                  });
                } catch (e) {
                  console.log(e);
                }
  
              },
              login: async (email, password) => {
                setLoading(true);
                try {
                  signInWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                      alert(email)
                })
                }catch (e) {
                  console.log(e);
                }
                finally{
                  setLoading(false);
                }
              },
              logout: async () => {
                setLoading(true);
                try{
                    logout()
                }catch (e) {
                  console.log(e);
                }
                finally{
                  setLoading(false);
                }
                },
            }}
        >
          {children}
        </AuthContext.Provider>
    );
  };

  export const userAuth = () => useContext(AuthContext)