import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Spinner, Content, Text, Card, CardItem, Button, Picker, Title, Icon,
  Left, Right, Body, Item, Input, Header, CheckBox
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useShowContext } from '../context/showContext';
import { useNotificationContext } from '../context/NotificationContext';

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
  const [t] = useTranslation();
  const shows = useShowContext();
  const [notifications, setNotifications] = useNotificationContext();
  const [showList, setShowList] = useState(null);
  const [show, setShow] = useState(null);
  const [input, setInput] = useState('');
  const [nextToPrepareChecked, setNextToPrepare] = useState(false);
  const [prepareChecked, setPrepare] = useState(true);
  const [inRingChecked, setInRing] = useState(false);

  useEffect(() => {
    setShowList(shows);
  }, [shows]);

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

  function ringName(r) {
    switch (r) {
      case 0:
        return t('pages.notificationContent.nextToPrepare');
      case 1:
        return t('pages.notificationContent.prepare');
      case 2:
        return t('pages.notificationContent.inRing');
      default:
        return '';
    }
  }

  function getShowName(notification) {
    const filteredShows = showList.filter(x => x.id === notification.showId);
    return filteredShows[0].name;
  }

  function addNotifications() {
    const not = [];
    if (nextToPrepareChecked) {
      not.push({
        ringNumber: input,
        showId: show.id,
        ring: rings.NextToPrepare
      });
    }
    if (prepareChecked) {
      not.push({
        ringNumber: input,
        showId: show.id,
        ring: rings.Prepare
      });
    }
    if (inRingChecked) {
      not.push({
        ringNumber: input,
        showId: show.id,
        ring: rings.InRing
      });
    }
    setNotifications([...notifications, ...not]);
    clear();
  }

  function deleteNotification(notifiction) {
    setNotifications(notifications.filter(x => x !== notifiction));
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

  if (!showList) {
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
            {showList && showList.map(showItem => (
              <Picker.Item
                label={showItem.name}
                key={Math.random().toString(36).substring(7)}
                value={showItem}
              />
            ))}
          </Picker>
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
                      autoFocus
                      placeholder={t('pages.notificationContent.ringNumberPlaceholder')}
                      style={style.input}
                      onChangeText={value => handleInput(value)}
                      value={input}
                      maxLength={10}
                      required
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
      {notifications.length > 0
        && (
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
                    onPress={() => deleteNotification(notification)}
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
        )}
    </Content>
  );
}

export default NotificationContent;
