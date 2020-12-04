import { FIREBASE_DB_NOTIFICATIONS } from '@env';
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
        notification.ringName = doc.data().ringName;
        notification.token = doc.data().token;
        notificationList.push(notification);
      });
      return notificationList;
    })
    .catch((error) => {
      throw new Error(`Firebase error: Error getting notifications: ${error}`);
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
      ringName: notification.ringName,
      language: notification.language
    });
    return doc;
  } catch (e) {
    throw new Error(`Firebase error: Error posting notifications: ${error}`);
  }
}

const deleteNotification = (notification, notificationToken) => {
  const doc = `${notification.showId}-${notification.ringNumber}-${notification.ring}-${notificationToken}`;
  try {
    if (!notification) throw new Error('notification is blank');
    database.collection(dbNotifications).doc(doc).delete();
    return doc;
  } catch (e) {
    throw new Error(`Firebase error: Error deleting notifications: ${error}`);
  }
};

export { getNotifications, postNotification, deleteNotification };
