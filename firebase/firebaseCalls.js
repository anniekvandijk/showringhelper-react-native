import { FIREBASE_DB_NOTIFICATIONS } from 'react-native-dotenv';
import { database } from './firebase';
import registerForPushNotificationsAsync from '../utilities/registerForPushNotifications';

const dbNotifications = FIREBASE_DB_NOTIFICATIONS;

const postNotification = (notification) => {

  registerForPushNotificationsAsync()
    .then(result => console.log(result.token));


  // const doc = `${notification.showId}-${notification.ringNumber}-${notification.ring}-${token}`;

  // try {
  //   if (!notification) throw new Error('No notification to post');
  //   database.collection(dbNotifications).doc(doc).set({
  //     token,
  //     showId: notification.showId,
  //     ringNumber: notification.ringNumber,
  //     ring: notification.ring
  //   });
  //   return doc;
  // } catch (e) {
  //   console.log(e);
  //   return null;
  // }
};

const deleteNotification = (notification) => {
  const doc = `${notification.showId}-${notification.ringNumber}-${notification.ring}-${getToken()}`;
  try {
    if (!notification) throw new Error('notification is blank');
    database.collection(dbNotifications).doc(doc).delete();
    return doc;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { postNotification, deleteNotification };
