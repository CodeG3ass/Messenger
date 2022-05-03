import firebase from "firebase/compat/app";
import '@firebase/auth';
import '@firebase/firestore';
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyBs5X0NsSqaBzDXlhJeffRppLYxmpbVMLI",
  authDomain: "chatdemo13-d08d6.firebaseapp.com",
  projectId: "chatdemo13-d08d6",
  storageBucket: "chatdemo13-d08d6.appspot.com",
  messagingSenderId: "51559923703",
  appId: "1:51559923703:web:74474c05a995f6d21378f2"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export const auth = getAuth()
  
  export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

  export const logout = () => signOut(auth)

  export const db = getFirestore()

  export { firebase };