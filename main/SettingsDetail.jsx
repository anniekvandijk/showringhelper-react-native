import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
  Content, Text, Card, CardItem, Body, Picker, Right, Left, Icon, Header, Button, Title
} from 'native-base';

const style = StyleSheet.create({
  content: {
    height: '100%'
  }
});

function SettingsDetail() {
  const [t, i18n] = useTranslation();
  const [language, setLanguage] = useState(i18n.language.split('-')[0]);

  function handleChangeLanguage(value) {
    setLanguage(value);
  }

  useEffect(() => {
    if (!language) {
      setLanguage(i18n.language.split('-')[0]);
      // store
    }
    console.log(language);
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <>
      <Content padder style={style.content}>
        <Card>
          <CardItem bordered>
            <Left>
              <Text>
                {t('pages.settingsDetail.language.text')}
              </Text>
            </Left>
            <Right>
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
                        {t('pages.settingsDetail.language.headerPlaceholder')}
                      </Title>
                    </Body>
                    <Right />
                  </Header>
                )
                }
                mode="dropdown"
                iosHeader={t('pages.settingsDetail.language.headerPlaceholder')}
                iosIcon={<Icon name="arrow-down" />}
                placeholder={t('pages.settingsDetail.language.headerPlaceholder')}
                style={{ width: undefined }}
                selectedValue={language}
                onValueChange={value => handleChangeLanguage(value)}
                itemTextStyle={{ color: '#000000' }}
              >
                <Picker.Item label="Nederlands" value="nl" />
                <Picker.Item label="English" value="en" />
              </Picker>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </>
  );
}

export default SettingsDetail;
