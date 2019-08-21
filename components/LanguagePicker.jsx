import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AsyncStorage } from 'react-native';
import {
  Body, Picker, Right, Left, Icon, Header, Button, Title
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
    console.log(language);
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
      style={{ width: undefined }}
      selectedValue={language}
      onValueChange={value => handleChangeLanguage(value)}
      itemTextStyle={{ color: '#000000' }}
    >
      <Picker.Item label="Nederlands" value="nl" />
      <Picker.Item label="English" value="en" />
    </Picker>
  );
}

export default LanguagePicker;
