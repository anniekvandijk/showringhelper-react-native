import { FIREBASE_DB_NOTIFICATIONS } from 'react-native-dotenv';
import { database } from './firebase';

const dbNotifications = FIREBASE_DB_NOTIFICATIONS;

async function getNotifications(token) {
  return database.collection(dbNotifications).where('token', '==', token).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
      }
      const notificationList = [];
      snapshot.forEach((doc) => {
        const notification = {};
        notification.showId = doc.data().showId;
        notification.showName = doc.data().showName;
        notification.ringNumber = doc.data().ringNumber;
        notification.ring = doc.data().ring;
        notification.token = doc.data().token;
        notificationList.push(notification);
      });
      return notificationList;
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}

async function postNotification(notification, token) {

  const doc = `${notification.showId}-${notification.ringNumber}-${notification.ring}-${token}`;

  try {
    if (!notification) throw new Error('No notification to post');
    database.collection(dbNotifications).doc(doc).set({
      token,
      showId: notification.showId,
      showName: notification.showName,
      ringNumber: notification.ringNumber,
      ring: notification.ring,
      language: notification.language
    });
    return doc;
  } catch (e) {
    console.log(e);
    return null;
  }
}

const deleteNotification = (notification) => {
  const doc = `${notification.showId}-${notification.ringNumber}-${notification.ring}-${notification.token}`;
  try {
    if (!notification) throw new Error('notification is blank');
    database.collection(dbNotifications).doc(doc).delete();
    return doc;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getNotifications, postNotification, deleteNotification };
