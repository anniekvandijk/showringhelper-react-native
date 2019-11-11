import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Picker, Title, Icon,
  Left, Right, Body, Header
} from 'native-base';
import { Platform } from 'react-native';
import { useShowContext } from '../../context/showContext';

function ShowPicker({ show, onChange }) {
  const [t] = useTranslation();
  const shows = useShowContext();

  function handleChangeShow(showItem) {
    if (showItem !== '-1') {
      onChange(showItem);
    } else {
      onChange(null);
    }
  }

  if (Platform.OS === 'android') {
    return (
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
        name="showDropdown"
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
    );
  }
  // IOS
  return (
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
      name="showDropdown"
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
  );
}

export default ShowPicker;
