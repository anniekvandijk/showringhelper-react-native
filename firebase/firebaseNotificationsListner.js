import { useState, useEffect } from 'react';
import { FIREBASE_DB_NOTIFICATIONS } from 'react-native-dotenv';
import { useNotificationTokenContext } from '../context/NotificationTokenContext';
import { database } from './firebase';

function FirebaseNotificationsListner() {
  const [state, setState] = useState(null);
  const [notificationToken] = useNotificationTokenContext();
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
    console.log('query token');
    console.log(notificationToken);
    if (notificationToken) {
      const unsubscribe = database
        .collection(dbCollection)
        .where('token', '==', notificationToken)
        .onSnapshot(querySnapshot => onChangeNotifications(querySnapshot));
      return () => unsubscribe();
    }
  }, [notificationToken]);

  return state;
}

export default FirebaseNotificationsListner;
