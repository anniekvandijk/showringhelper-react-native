import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AsyncStorage } from 'react-native';
import {
  Body, Right, Left, Icon, Header, Button, Title, Picker
} from 'native-base';

function LanguagePicker() {
  const [t, i18n] = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  function handleChangeLanguage(value) {
    setLanguage(value);
    // store
    AsyncStorage.setItem('i18n', JSON.stringify(value));
  }

  useEffect(() => {
    if (!language) {
      setLanguage(i18n.language);
    }
    i18n.changeLanguage(language);
  }, [language]);

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
              {t('components.languagePicker.headerPlaceholder')}
            </Title>
          </Body>
          <Right />
        </Header>
      )
      }
      mode="dropdown"
      iosHeader={t('components.languagePicker.headerPlaceholder')}
      iosIcon={<Icon name="arrow-down" />}
      placeholder={t('components.languagePicker.headerPlaceholder')}
      placeholderStyle={{ color: '#000' }}
      style={{ width: '100%' }}
      itemTextStyle={{ color: '#000000' }}
      selectedValue={language}
      onValueChange={value => handleChangeLanguage(value)}
    >
      <Picker.Item label="Nederlands" key="0" value="nl" />
      <Picker.Item label="English" key="1" value="en" />
    </Picker>
  );
}

export default LanguagePicker;
