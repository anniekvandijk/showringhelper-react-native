import { useState, useEffect } from 'react';
import { FIREBASE_DB_SHOWS } from '@env';
import { database } from './firebase';

function FirebaseShowsListner() {
  const [state, setState] = useState(null);
  const dbCollection = FIREBASE_DB_SHOWS;

  const onChangeShows = (querySnapshot) => {
    if (querySnapshot) {
      const shows = [];
      querySnapshot.forEach((doc) => {
        const Show = {};
        Show.id = doc.id;
        Object.keys(doc.data()).map((key) => {
          Show[key] = doc.data()[key];
          return null;
        });
        shows.push(Show);
      });
      setState(shows);
    } else {
      setState(null);
    }
  };

  useEffect(() => {
    const unsubscribe = database.collection(dbCollection).where('activeShow', '==', true)
      .onSnapshot(querySnapshot => onChangeShows(querySnapshot));
    return () => unsubscribe();
  }, [dbCollection]);

  return state;
}

export default FirebaseShowsListner;
