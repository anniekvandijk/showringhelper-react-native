import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID
} from 'react-native-dotenv';

// Initialize Firebase
const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
const database = firebase.firestore();
database.settings({ });

export { firebase, database };
