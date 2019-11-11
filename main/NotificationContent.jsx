import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Notifications } from 'expo';
import {
  Spinner, Content, Text, Card, CardItem, Button, Left, Right, Body, Item, CheckBox
} from 'native-base';
import { StyleSheet } from 'react-native';
import AlertMessage from '../components/AlertMessage';
import registerForPushNotificationsAsync from '../utilities/registerForPushNotifications';
import { useNotificationTokenContext } from '../context/NotificationTokenContext';
import { useNotificationContext } from '../context/NotificationContext';
import { useShowContext } from '../context/showContext';
import { postNotification } from '../firebase/firebaseCalls';
import ShowPicker from '../components/notificationContent/ShowPicker';
import NumberInput from '../components/notificationContent/NumberInput';
import NotificationList from '../components/notificationContent/NotificationList';

const style = StyleSheet.create({
  content: {
    height: '100%'
  },
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

function NotificationContent() {
  const [t, i18n] = useTranslation();
  const shows = useShowContext();
  const [notificationToken, setNotificationToken] = useNotificationTokenContext();
  const [notifications, setNotifications] = useNotificationContext();
  const [show, setShow] = useState(null);
  const [input, setInput] = useState('');
  const [nextToPrepareChecked, setNextToPrepare] = useState(false);
  const [prepareChecked, setPrepare] = useState(false);
  const [inRingChecked, setInRing] = useState(false);

  function clear() {
    setInput('');
  }

  function handleChangeShow(showItem) {
    setShow(showItem);
    clear();
  }

  const rings = {
    NextToPrepare: 0,
    Prepare: 1,
    InRing: 2
  };

  function displayAlertMessage() {
    AlertMessage(t('pages.notificationContent.alertHeader'), t('pages.notificationContent.alertText'));
  }

  async function getToken() {
    const token = await Notifications.getExpoPushTokenAsync();
    setNotificationToken(token);
    return token;
  }

  function addNotifications() {
    registerForPushNotificationsAsync()
      .then((granted) => {
        if (granted === false) {
          displayAlertMessage();
        } else {
          getToken()
            .then((token) => {
              if (token) {
                if (nextToPrepareChecked) {
                  const not = {
                    ringNumber: input,
                    showId: show.id,
                    ring: rings.NextToPrepare,
                    language: i18n.language
                  };
                  postNotification(not, token);
                  const notList = [...notifications, not];
                  setNotifications(notList);
                }
                if (prepareChecked) {
                  const not = {
                    ringNumber: input,
                    showId: show.id,
                    ring: rings.Prepare,
                    language: i18n.language
                  };
                  postNotification(not, token);
                  const notList = [...notifications, not];
                  setNotifications(notList);
                }
                if (inRingChecked) {
                  const not = {
                    ringNumber: input,
                    showId: show.id,
                    ring: rings.InRing,
                    language: i18n.language
                  };
                  postNotification(not, token);
                  const notList = [...notifications, not];
                  setNotifications(notList);
                }
              }
            })
            .catch(error => console.log(error));
        }
      });
    clear();
  }

  function handleInput(value) {
    setInput(value);
  }

  function checkboxNextToPrepare() {
    setNextToPrepare(!nextToPrepareChecked);
  }

  function checkboxPrepare() {
    setPrepare(!prepareChecked);
  }

  function checkboxInring() {
    setInRing(!inRingChecked);
  }

  if (!shows) {
    return (
      <>
        <Spinner />
        <Text style={style.spinnerText}>
          {t('spinner')}
        </Text>
      </>
    );
  }

  return (
    <Content padder style={style.content}>
      <Card>
        <CardItem bordered>
          <Left>
            <Text>{t('pages.notificationContent.text')}</Text>
          </Left>
        </CardItem>
        <CardItem bordered>
          <ShowPicker
            show={show}
            onChange={handleChangeShow}
          />
        </CardItem>
        {show
          && (
            <>
              <CardItem>
                <CheckBox
                  name="nextToPrepareCheckbox"
                  style={style.checkbox}
                  checked={nextToPrepareChecked}
                  onPress={() => checkboxNextToPrepare()}
                />
                <Body>
                  <Text>{t('pages.notificationContent.nextToPrepare')}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <CheckBox
                  name="prepareCheckbox"
                  style={style.checkbox}
                  checked={prepareChecked}
                  onPress={() => checkboxPrepare()}
                />
                <Body>
                  <Text>{t('pages.notificationContent.prepare')}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <CheckBox
                  name="inRingCheckbox"
                  style={style.checkbox}
                  checked={inRingChecked}
                  onPress={() => checkboxInring()}
                />
                <Body>
                  <Text>{t('pages.notificationContent.inRing')}</Text>
                </Body>
              </CardItem>
              <CardItem bordered>
                <Left>
                  <Item regular>
                    <NumberInput
                      value={input}
                      onChange={handleInput}
                    />
                  </Item>
                </Left>
                <Right>
                  <Button
                    title="Alert"
                    onPress={() => addNotifications()}
                    disabled={
                      input.length === 0
                      || !(nextToPrepareChecked
                      || prepareChecked
                      || inRingChecked)}
                  >
                    <Text>{t('pages.notificationContent.addButton')}</Text>
                  </Button>
                </Right>
              </CardItem>
            </>
          )
        }
      </Card>
      <NotificationList />
    </Content>
  );
}

export default NotificationContent;
