import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { useNotificationTokenContext } from '../context/NotificationTokenContext';

async function registerForPushNotificationsAsync() {
  const [notificationToken, setNotificationToken] = useNotificationTokenContext();
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return false;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  setNotificationToken(token);

  return true;
}

export default registerForPushNotificationsAsync;
