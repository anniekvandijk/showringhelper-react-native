import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
  Content, Text, Card, CardItem, Right, Left
} from 'native-base';
import LanguagePicker from '../components/LanguagePicker';

const style = StyleSheet.create({
  content: {
    height: '100%'
  }
});

function SettingsDetail() {
  const [t] = useTranslation();

  return (
    <>
      <Content padder style={style.content}>
        <Card>
          <CardItem bordered>
            <Left>
              <Text>
                {t('pages.settingsDetail.languageText')}
              </Text>
            </Left>
            <Right>
              <LanguagePicker />
            </Right>
          </CardItem>
        </Card>
      </Content>
    </>
  );
}

export default SettingsDetail;
