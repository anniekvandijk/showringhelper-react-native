import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
  Content, Text, Card, CardItem, Body, Left, Right, Button
} from 'native-base';
import { useRingNumbersContext } from '../context/ringNumbersContext';
import { useFavoritesContext } from '../context/favoritesContext';
import NumberChip from '../components/NumberChip';
import startNumberDetails from '../utilities/startNumberDetails';

const style = StyleSheet.create({
  content: {
    height: '100%'
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

function RingNumberDetail({ navigation }) {
  const [t, i18n] = useTranslation();
  const [favorites, setFavorites] = useFavoritesContext();
  const value = navigation.getParam('value');
  const showId = navigation.getParam('showId');
  const showName = navigation.getParam('showName');
  const ringNumbers = useRingNumbersContext();
  const startNumber = { showId, showName, value };
  const startNumberDetailList = startNumberDetails(ringNumbers, startNumber);
  const language = i18n.language;

  const isFavorite = favorites
    && favorites.length > 0
    && favorites.filter(
      x => x.value === startNumber.value && x.showId === startNumber.showId
    ).length > 0;

  function favoriteToggle() {
    if (isFavorite) {
      const fav = favorites.filter(x => (x.value === startNumber.value && x.showId === startNumber.showId));
      if (fav.length > 0) {
        const rest = favorites.filter(x => x !== fav[0]);
        setFavorites(rest);
      }
    } else {
      setFavorites([...favorites, startNumber]);
    }
  }

  function Details() {
    if (startNumberDetailList) {
      return (
        startNumberDetailList.map(values => (
          <CardItem bordered key={Math.random().toString(36).substring(7)}>
            <Left><Text>{language === 'nl' ? values.nl : values.en}</Text></Left>
            <Body><Text>{values.value}</Text></Body>
          </CardItem>
        ))
      );
    }
    return (
      <CardItem bordered>
        <Left><Text>{t('pages.ringNumberDetail.noDetails')}</Text></Left>
      </CardItem>
    );
  }

  return (
    <>
      <Content padder style={style.content}>
        <Card>
          <CardItem bordered>
            <Body>
              <Text style={style.buttonText}>{t('pages.ringNumberDetail.header')}</Text>
              <Text>{showName}</Text>
            </Body>
            <Right>
              <NumberChip
                key={showId + value}
                disabled={false}
                startNumber={startNumber}
                onPress={() => navigation.navigate('RingNumberDetail', { showId, value, showName })}
              />
            </Right>
          </CardItem>
          <CardItem>
            <Button onPress={favoriteToggle}>
              <Text style={style.buttonText}>
                {isFavorite ? t('pages.ringNumberDetail.deleteFromFavorites') : t('pages.ringNumberDetail.addToFavorites')}
              </Text>
            </Button>
          </CardItem>
          <Details />
        </Card>
      </Content>
    </>
  );
}

export default RingNumberDetail;
