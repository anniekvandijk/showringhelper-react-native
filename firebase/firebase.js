import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

console.log(config);

firebase.initializeApp(config);
const database = firebase.firestore();
database.settings({ });

export { firebase, database };
