import { useState, useEffect } from 'react';
import { FIREBASE_DB_NOTIFICATIONS } from 'react-native-dotenv';
import { database } from './firebase';

function FirebaseNotificationsListner() {
  const [state, setState] = useState(null);
  const dbCollection = FIREBASE_DB_NOTIFICATIONS;
  const token = '12345';

  const onChangeNotifications = (querySnapshot) => {
    if (querySnapshot) {
      const notifications = [];
      querySnapshot.forEach((doc) => {
        const notification = {};
        const string = doc.id.split('-');
        notification.showId = string[0];
        notification.ringNumber = string[1];
        notification.ring = string[2];
        console.log(notification);
        notifications.push(notification);
      });
      setState(notifications);
    } else {
      setState(null);
    }
  };

  useEffect(() => {
    const unsubscribe = database.collection(dbCollection).where('token', '==', token)
      .onSnapshot(querySnapshot => onChangeNotifications(querySnapshot));
    return () => unsubscribe();
  }, [dbCollection]);

  return state;
}

export default FirebaseNotificationsListner;
