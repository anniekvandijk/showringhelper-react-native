import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
  Content, Text, Card, CardItem, Body, Left, Right, Button, Icon
} from 'native-base';
import { useRingNumbersContext } from '../context/ringNumbersContext';
import { useFavoritesContext } from '../context/favoritesContext';
import FavoriteIcon from '../components/FavoriteIcon';


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
  const [favorite, setFavorite] = useState(false);
  const value = navigation.getParam('value');
  const showId = navigation.getParam('showId');
  const showName = navigation.getParam('showName');
  const ringNumbers = useRingNumbersContext();

  if (!ringNumbers) {
    return <NoDetails />;
  }
  const showNumbers = ringNumbers && ringNumbers.filter(x => x.showId === showId);
  if (showNumbers.length === 0) {
    return <NoDetails />;
  }
  const arrayOfNumbers = showNumbers && showNumbers[0].ringnumbers;
  if (showNumbers.length === 0) {
    return <NoDetails />;
  }
  const detailValues = arrayOfNumbers && arrayOfNumbers.filter(x => x.number === value);
  if (detailValues.length === 0) {
    return <NoDetails />;
  }
  const arrayOfDetails = detailValues && detailValues[0].values;
  if (arrayOfDetails.length === 0) {
    return <NoDetails />;
  }
  const language = i18n.language;

  function favoriteToggle() {
    if (favorite) {
      setFavorites(favorites.filter(x => x.showId !== showId && x.value !== value));
      setFavorite(false);
    } else {
      setFavorites([...favorites, { showId, showName, value }]);
      setFavorite(true);
    }
  }

  function NoDetails() {
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
                <Button
                  rounded
                  disabled
                  key={value}
                  style={style.button}
                >
                  <Text style={style.buttonText}>{value}</Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left><Text>{t('pages.ringNumberDetail.noDetails')}</Text></Left>
            </CardItem>
          </Card>
        </Content>
      </>
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
              <Button
                rounded
                disabled
                key={value}
                style={style.button}
              >
                <Text style={style.buttonText}>{value}</Text>
                {favorite && <FavoriteIcon />}
              </Button>
            </Right>
          </CardItem>
          <CardItem>
            <Button onPress={favoriteToggle}>
              <Text style={style.buttonText}>
                {favorites ? t('pages.ringNumberDetail.deleteFromFavorites') : t('pages.ringNumberDetail.addToFavorites')}
              </Text>
              <Text style={style.buttonText}>Add to favorites</Text>
            </Button>
          </CardItem>
          {arrayOfDetails.map(values => (
            <CardItem bordered key={Math.random().toString(36).substring(7)}>
              <Left><Text>{language === 'nl' ? values.nl : values.en}</Text></Left>
              <Body><Text>{values.value}</Text></Body>
            </CardItem>
          ))
        }
        </Card>
      </Content>
    </>
  );
}

export default RingNumberDetail;
