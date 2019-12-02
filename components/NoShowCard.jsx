import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Card, CardItem, Body } from 'native-base';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  header: {
    backgroundColor: '#197b30'
  },
  headerTitle: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
});

function NoShowCard() {
  const [t] = useTranslation();
  return (
    <Card>
      <CardItem header bordered style={style.header}>
        <Text style={style.headerTitle}>{t('components.noShowCard.header')}</Text>
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text>{t('components.noShowCard.body')}</Text>
        </Body>
      </CardItem>
    </Card>
  );
}

export default NoShowCard;
