import { getApp, getApps, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcxIsyMOMrkcaVX_3qAyaenUrZ68fNxqY",
  authDomain: "meuvizinho-73bb1.firebaseapp.com",
  databaseURL: "https://meuvizinho-73bb1-default-rtdb.firebaseio.com",
  projectId: "meuvizinho-73bb1",
  storageBucket: "meuvizinho-73bb1.appspot.com",
  messagingSenderId: "570118346111",
  appId: "1:570118346111:web:473772fdc3fcacc43df64a"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {app, db, auth}