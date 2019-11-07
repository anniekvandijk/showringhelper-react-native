import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Spinner, Text, Card, CardItem, Button,
  Right, Body
} from 'native-base';
import { Notifications } from 'expo';
import { StyleSheet } from 'react-native';
import { useShowContext } from '../context/showContext';
import { useNotificationContext } from '../context/notificationContext';
import { deleteNotification } from '../firebase/firebaseCalls';

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

function NotificationList() {
  const [t] = useTranslation();
  const shows = useShowContext();
  const notifications = useNotificationContext();

  if (!notifications) {
    return (
      <>
        <Spinner />
        <Text style={style.spinnerText}>
          {t('spinner')}
        </Text>
      </>
    );
  }

  function getShowName(notification) {
    const filteredShows = shows && shows.filter(x => x.id === notification.showId);
    if (filteredShows.length === 0) {
      deleteNotification(notification);
      return '';
    }
    return filteredShows[0].name;
  }

  function ringName(r) {
    switch (r) {
      case '0':
        return t('pages.notificationContent.nextToPrepare');
      case '1':
        return t('pages.notificationContent.prepare');
      case '2':
        return t('pages.notificationContent.inRing');
      default:
        return '';
    }
  }

  async function getToken() {
    const token = await Notifications.getExpoPushTokenAsync();
    return token;
  }

  function deleteThis(notification) {
    getToken()
      .then((token) => {
        deleteNotification(notification, token);
      });
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
              <Body>
                <Button rounded disabled style={style.button}>
                  <Text style={style.buttonText}>{notification.ringNumber}</Text>
                </Button>
              </Body>
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
                {`${ringName(notification.ring)}, ${getShowName(notification)}`}
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
