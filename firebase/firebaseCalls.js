import { FIREBASE_DB_NOTIFICATIONS } from 'react-native-dotenv';
import { database } from './firebase';

const dbNotifications = FIREBASE_DB_NOTIFICATIONS;
const token = '12345';

const getNotifications = () => {
  database.collection(dbNotifications).where('token', '==', token).get()
    .then((snapshot) => {
      const notifications = [];
      snapshot.forEach((doc) => {
        const notification = {};
        console.log(doc.id, '=>', doc.data());
        notification.ringNumber = 'bla';
        notification.showId = 'blabla';
        notification.ring = 'blablabla';
        notifications.push(notification);
      });
      return notifications;
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
};

const postNotification = (notification) => {
  const doc = `${notification.showId}-${notification.ring}-${notification.ringNumber}`;

  try {
    if (!notification) throw new Error('No notification to post');
    database.collection(dbNotifications).doc(doc).set({
      token
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};

const deleteNotification = (notification) => {
  const doc = `${notification.showId}-${notification.ring}-${notification.ringNumber}`;
  try {
    if (!notification) throw new Error('id is blank');
    database.collection(dbNotifications).doc(doc).delete(token);
    return id;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getNotifications, postNotification, deleteNotification };
