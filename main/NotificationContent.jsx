import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Spinner, Content, Text, Card, CardItem, Button, Picker, Title, Icon,
  Left, Right, Body, Item, Input, Header, CheckBox
} from 'native-base';
import { StyleSheet, AsyncStorage } from 'react-native';
import { useShowContext } from '../context/showContext';
import createId from '../utilities/createId';

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
  input: {
    
  }
});

function NotificationContent() {
  const [t] = useTranslation();
  const shows = useShowContext();
  const [showList, setShowList] = useState(null);
  const [show, setShow] = useState(null);
  const [input, setInput] = useState('');
  const [nextToPrepareChecked, setNextToPrepare] = useState(false);
  const [prepareChecked, setPrepare] = useState(true);
  const [inRingChecked, setInRing] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setShowList(shows);
  }, [shows]);

  function clear() {
    setInput('');
    setNextToPrepare(false);
    setPrepare(true);
    setInRing(false);
  }

  function handleChangeShow(value) {
    setShow(value);
    clear();
  }

  function addAlert() {
    setAlerts([...alerts, {
      id: createId(),
      ringNumber: input,
      showId: show,
      nextToPrepare: nextToPrepareChecked,
      prepare: prepareChecked,
      inRing: inRingChecked
    }]);
  
    // sent to server
    clear();
  }

  function deleteAlert(id) {
    setAlerts(alerts.filter(x => x.id !== id));
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
        <CardItem>
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
            style={{ width: '100%' }}
            itemTextStyle={{ color: '#000000' }}
            selectedValue={show}
            onValueChange={value => handleChangeShow(value)}
          >
            {showList && showList.map(showItem => (
              <Picker.Item
                label={showItem.name}
                key={Math.random().toString(36).substring(7)}
                value={showItem.id}
              />
            ))}
          </Picker>
        </CardItem>
        {show
          && (
            <CardItem bordered>
              <Left>
                <Item regular>
                  <Input
                    autoFocus
                    placeholder="Ringnumber"
                    style={style.input}
                    onChangeText={value => handleInput(value)}
                    value={input}
                    maxLength={10}
                  />
                </Item>
              </Left>
              <Body>
                <CheckBox
                  style={style.checkbox}
                  checked={nextToPrepareChecked}
                  onPress={() => checkboxNextToPrepare()}
                />
                <Text>Next to prepare</Text>
                <CheckBox
                  style={style.checkbox}
                  checked={prepareChecked}
                  onPress={() => checkboxPrepare()}
                />
                <Text>Prepare</Text>
                <CheckBox
                  style={style.checkbox}
                  checked={inRingChecked}
                  onPress={() => checkboxInring()}
                />
                <Text>In ring</Text>
              </Body>
              <Right>
                <Button
                  title="Alert"
                  onPress={() => addAlert()}
                >
                  <Text> Add </Text>
                </Button>
              </Right>
            </CardItem>
          )
        }
        {alerts.length > 0 && alerts.map(alertItem => (
          <CardItem bordered key={Math.random().toString(36).substring(7)}>
            <Body>
              <Text>
                Ringnr: {alertItem.ringNumber}
              </Text>
              <Text>
                Show: {alertItem.showId}
              </Text>
              <CheckBox
                style={style.checkbox}
                checked={alertItem.nextToPrepare}
                disabled
              />
              <Text>Next to prepare</Text>
              <CheckBox
                style={style.checkbox}
                checked={alertItem.prepare}
                disabled
              />
              <Text>Prepare</Text>
              <CheckBox
                style={style.checkbox}
                checked={alertItem.inRing}
                disabled
              />
              <Text>In ring</Text>
            </Body>
            <Right>
              <Button
                title="Delete alert"
                onPress={() => deleteAlert(alertItem.id)}
              >
                <Text> Delete </Text>
              </Button>
            </Right>
          </CardItem>
        ))}
      </Card>
    </Content>
  );
}

export default NotificationContent;
