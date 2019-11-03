import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

async function registerForPushNotificationsAsync() {
  
  async function getPermissions() {
    await Permissions.getAsync(Permissions.NOTIFICATIONS);
  }

  async function askPermissions() {
    const status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    const granted = status.permissions.notifications.granted;
    if (granted) {
      return true;
    }
    return false;
  }

  getPermissions()
    .then(
      askPermissions()
        .then((granted) => { return granted; })
        .catch((error) => { console.log(error); })
    )
    .catch((error) => { console.log(error); });
}

export default registerForPushNotificationsAsync;
