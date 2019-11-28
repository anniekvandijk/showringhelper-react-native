import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text, Card, CardItem, Button, Left,
  Right, Body
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useShowContext } from '../../context/showContext';
import { useNotificationTokenContext } from '../../context/NotificationTokenContext';
import { useNotificationContext } from '../../context/NotificationContext';
import { deleteNotification } from '../../firebase/firebaseCalls';
import NumberChip from '../NumberChip';


const style = StyleSheet.create({
  spinnerText: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center'
  },
  checkbox: {
    marginRight: 40
  },
  button: {
    backgroundColor: '#e56228',
    marginTop: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

function NotificationList({ navigation }) {
  const [notificationToken] = useNotificationTokenContext();
  const [t] = useTranslation();
  const [notifications, setNotifications] = useNotificationContext();

  function deleteThis(notification) {
    if (notificationToken) {
      deleteNotification(notification);
      setNotifications(notifications.filter(x => x !== notification));
    }
  }

  if (notifications && notifications.length > 0) {
    return (
      <Card>
        <CardItem header bordered>
          <Text>{t('pages.notificationContent.notificationsHeader')}</Text>
        </CardItem>
        {notifications.map(notification => (
          <React.Fragment key={Math.random().toString(36).substring(7)}>
            <CardItem>
              <Left>
                <NumberChip
                  disabled={false}
                  onPress={() => navigation.navigate('RingNumberDetail', { showId: notification.showId, value: notification.ringNumber, showName: notification.showName })}
                  startNumber={{ value: notification.ringNumber, showId: notification.showId, showName: notification.showName }}
                />
              </Left>
              <Right>
                <Button
                  title="Delete alert"
                  onPress={() => deleteThis(notification)}
                >
                  <Text>{t('pages.notificationContent.deleteButton')}</Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Text>
                {`${notification.ringName}, ${notification.showName}`}
              </Text>
            </CardItem>
          </React.Fragment>
        ))}
      </Card>
    );
  }
  return (
    <Card>
      <CardItem header bordered>
        <Text>{t('pages.notificationContent.notificationsHeader')}</Text>
      </CardItem>
      <CardItem bordered>
        <Text>{t('pages.notificationContent.noNotifications')}</Text>
      </CardItem>
    </Card>
  );
}

export default NotificationList;
