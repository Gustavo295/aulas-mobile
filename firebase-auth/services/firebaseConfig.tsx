import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Irá pegar o getReactNativePersistence sem a necessidade de tipagem
const {getReactNativePersistence} = require("firebase/auth") as any

const firebaseConfig = {
  apiKey: "AIzaSyDPLgLgZNdqBQTm3X6S1IgrPvCgkOqUZLI",
  authDomain: "aula-firebase-a4e69.firebaseapp.com",
  projectId: "aula-firebase-a4e69",
  storageBucket: "aula-firebase-a4e69.firebasestorage.app",
  messagingSenderId: "300725995120",
  appId: "1:300725995120:web:e4ac7105a5477c9e1296b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app,{
  persistence:getReactNativePersistence(AsyncStorage)
})

export {auth}