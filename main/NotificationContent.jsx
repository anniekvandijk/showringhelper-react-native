import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Spinner, Content, Text, Card, CardItem, Button, Picker, Title, Icon,
  Left, Right, Body, Item, Input, Header, CheckBox
} from 'native-base';
import { Notifications } from 'expo';
import { StyleSheet, Platform, Alert } from 'react-native';
import registerForPushNotificationsAsync from '../utilities/registerForPushNotifications';
import { useShowContext } from '../context/showContext';
import { deleteNotification, postNotification } from '../firebase/firebaseCalls';
import NotificationList from '../components/NotificationList';

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
  const [show, setShow] = useState(null);
  const [input, setInput] = useState('');
  const [nextToPrepareChecked, setNextToPrepare] = useState(false);
  const [prepareChecked, setPrepare] = useState(false);
  const [inRingChecked, setInRing] = useState(false);
  const [receiveNotificationsGranted, setReceiveNotificationsGranted] = useState(null);

  function clear() {
    setInput('');
  }

  function handleChangeShow(showItem) {
    if (showItem !== '-1') {
      setShow(showItem);
    } else {
      setShow(null);
    }
    clear();
  }

  const rings = {
    NextToPrepare: 0,
    Prepare: 1,
    InRing: 2
  };

  async function getToken() {
    const token = await Notifications.getExpoPushTokenAsync();
    return token;
  }

  function addNotifications() {
    registerForPushNotificationsAsync()
      .then((granted) => {
        if (granted === false) {
          setReceiveNotificationsGranted(false);
          // Works on both iOS and Android
          Alert.alert(
            t('pages.notificationContent.alertHeader'),
            t('pages.notificationContent.alertText'),
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false },
          );
        } else {
          setReceiveNotificationsGranted(true);
          getToken()
            .then((token) => {
              if (nextToPrepareChecked) {
                postNotification({
                  ringNumber: input,
                  showId: show.id,
                  ring: rings.NextToPrepare,
                  language: i18n.language
                }, token);
              }
              if (prepareChecked) {
                postNotification({
                  ringNumber: input,
                  showId: show.id,
                  ring: rings.Prepare,
                  language: i18n.language
                }, token);
              }
              if (inRingChecked) {
                postNotification({
                  ringNumber: input,
                  showId: show.id,
                  ring: rings.InRing,
                  language: i18n.language
                }, token);
              }
              clear();
            })
            .catch(error => console.log(error));
        }
      });
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
          {Platform.OS === 'android'
            ? (
              <Picker
                renderHeader={backAction => (
                  <Header>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="arrow-back" />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title>
                        {t('pages.notificationContent.showPickerPlaceholder')}
                      </Title>
                    </Body>
                    <Right />
                  </Header>
                )
                }
                mode="dropdown"
                iosHeader={t('pages.notificationContent.showPickerPlaceholder')}
                iosIcon={<Icon name="arrow-down" />}
                placeholder={t('pages.notificationContent.showPickerPlaceholder')}
                placeholderStyle={{ color: '#000' }}
                style={{ width: '85%' }}
                itemTextStyle={{ color: '#000000' }}
                selectedValue={show}
                onValueChange={value => handleChangeShow(value)}
              >
                <Picker.Item
                  label={t('pages.notificationContent.selectShow')}
                  value="-1"
                />
                {shows && shows.map(showItem => (
                  <Picker.Item
                    label={showItem.name}
                    key={Math.random().toString(36).substring(7)}
                    value={showItem}
                  />
                ))}
              </Picker>
            )
            : (
              <Picker
                renderHeader={backAction => (
                  <Header>
                    <Left>
                      <Button transparent onPress={backAction}>
                        <Icon name="arrow-back" />
                      </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                      <Title>
                        {t('pages.notificationContent.showPickerPlaceholder')}
                      </Title>
                    </Body>
                    <Right />
                  </Header>
                )
                }
                mode="dropdown"
                iosHeader={t('pages.notificationContent.showPickerPlaceholder')}
                iosIcon={<Icon name="arrow-down" />}
                placeholder={t('pages.notificationContent.showPickerPlaceholder')}
                placeholderStyle={{ color: '#000' }}
                style={{ width: '85%' }}
                itemTextStyle={{ color: '#000000' }}
                selectedValue={show}
                onValueChange={value => handleChangeShow(value)}
              >
                {shows && shows.map(showItem => (
                  <Picker.Item
                    label={showItem.name}
                    key={Math.random().toString(36).substring(7)}
                    value={showItem}
                  />
                ))}
              </Picker>
            )
        }
        </CardItem>
        {show
          && (
            <React.Fragment key={Math.random().toString(36).substring(7)}>
              <CardItem>
                <CheckBox
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
                    <Input
                      placeholder={t('pages.notificationContent.ringNumberPlaceholder')}
                      style={style.input}
                      onChangeText={value => handleInput(value)}
                      value={input}
                      maxLength={10}
                    />
                  </Item>
                </Left>
                <Right>
                  <Button
                    title="Alert"
                    onPress={() => addNotifications()}
                    disabled={input.length === 0 || !(nextToPrepareChecked || prepareChecked || inRingChecked)}
                  >
                    <Text>{t('pages.notificationContent.addButton')}</Text>
                  </Button>
                </Right>
              </CardItem>
            </React.Fragment>
          )
        }
      </Card>
      <NotificationList />
    </Content>
  );
}

export default NotificationContent;
