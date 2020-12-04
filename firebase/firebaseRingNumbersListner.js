import { useState, useEffect } from 'react';
import { FIREBASE_DB_RINGNUMBERS } from '@env';
import { database } from './firebase';

function FirebaseRingNumbersListner() {
  const [state, setState] = useState(null);
  const dbCollection = FIREBASE_DB_RINGNUMBERS;

  const onChangeRingNumbers = (querySnapshot) => {
    if (querySnapshot) {
      const records = [];
      querySnapshot.forEach((doc) => {
        records.push(doc.data());
      });
      setState(records);
    } else {
      setState(null);
    }
  };

  useEffect(() => {
    const unsubscribe = database.collection(dbCollection)
      .onSnapshot(querySnapshot => onChangeRingNumbers(querySnapshot));
    return () => unsubscribe();
  }, [dbCollection]);

  return state;
}

export default FirebaseRingNumbersListner;
