import { useState, useEffect } from 'react';
import { FIREBASE_DB } from 'react-native-dotenv';
import { database } from './firebase';

function FirebaseShowsListner() {
  const [state, setState] = useState([]);
  const dbCollection = FIREBASE_DB;

  const onChangeShows = (querySnapshot) => {
    if (querySnapshot) {
      const shows = [];
      querySnapshot.forEach((doc) => {
        shows.push(doc.data());
      });
      setState(shows);
    } else {
      setState([]);
    }
  };

  useEffect(() => {
    const unsubscribe = database.collection(dbCollection)
      .onSnapshot(querySnapshot => onChangeShows(querySnapshot));
    return () => unsubscribe();
  }, [dbCollection]);

  return state;
}

export default FirebaseShowsListner;
