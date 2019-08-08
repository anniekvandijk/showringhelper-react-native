import { useState, useEffect } from 'react';
import { database } from './firebase';

function FirebaseShowsListner() {
  const [state, setState] = useState(null);
  const dbCollection = process.env.REACT_APP_FIREBASE_DB;

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
    const unsubscribe = database.collection(dbCollection)
      .onSnapshot(querySnapshot => onChangeShows(querySnapshot));
    return () => unsubscribe();
  }, [dbCollection]);

  return state;
}

export default FirebaseShowsListner;
