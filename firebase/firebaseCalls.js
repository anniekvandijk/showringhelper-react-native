import { FIREBASE_DB_NOTIFICATIONS } from 'react-native-dotenv';
import { Notifications } from 'expo';
import { database } from './firebase';
import registerForPushNotificationsAsync from '../utilities/registerForPushNotifications';

const dbNotifications = FIREBASE_DB_NOTIFICATIONS;

async function getToken() {
  const token = await Notifications.getExpoPushTokenAsync();
  return token;
}

async function postNotification(notification) {

  registerForPushNotificationsAsync()
    .then((result) => {
      console.log(result);
      if (result) {
        console.log(result);
      }
    });

  getToken()
    .then(token => console.log(token));

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
