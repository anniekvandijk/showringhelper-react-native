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

  async function getToken() {
    const token = await Notifications.getExpoPushTokenAsync();
    return token;
  }

  getPermissions()
    .then(
      askPermissions()
        .then((granted) => {
          if (granted) {
            getToken()
              .then((result) => { console.log(result); return { granted: true, token: result }; })
              .catch((error) => { console.log(error); });
          }
          return { granted: false, token: null };
        })
        .catch((error) => { console.log(error); })
    )
    .catch((error) => { console.log(error); });
}

export default registerForPushNotificationsAsync;
