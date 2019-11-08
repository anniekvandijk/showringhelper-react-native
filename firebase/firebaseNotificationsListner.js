import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { FIREBASE_DB_NOTIFICATIONS } from 'react-native-dotenv';
import { database } from './firebase';

function FirebaseNotificationsListner() {
  const [state, setState] = useState(null);
  const dbCollection = FIREBASE_DB_NOTIFICATIONS;

  const onChangeNotifications = (querySnapshot) => {
    if (querySnapshot) {
      const notifications = [];
      querySnapshot.forEach((doc) => {
        const notification = {};
        const string = doc.id.split('-');
        notification.showId = string[0];
        notification.ringNumber = string[1];
        notification.ring = string[2];
        notifications.push(notification);
      });
      setState(notifications);
    } else {
      setState(null);
    }
  };

  useEffect(() => {
    AsyncStorage
      .getItem('token')
      .then((result) => {
        console.log('query token');
        console.log(result);
        if (result) {
          const token = JSON.parse(result);
          const unsubscribe = database
            .collection(dbCollection)
            .where('token', '==', token)
            .onSnapshot(querySnapshot => onChangeNotifications(querySnapshot));
          return () => unsubscribe();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dbCollection]);

  return state;
}

export default FirebaseNotificationsListner;
