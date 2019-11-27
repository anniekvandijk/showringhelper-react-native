import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text, Card, CardItem, Button, Left,
  Right, Body
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useFavoritesContext } from '../context/favoritesContext';

const style = StyleSheet.create({
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

function FavoritesContent() {
  const [t] = useTranslation();
  const [favorites, setFavorites] = useFavoritesContext();

  function deleteFavorite(favorite) {
    setFavorites(favorites.filter(x => x !== favorite));
  }

    return (
      <Card>
        <CardItem header bordered>
          <Text>{t('pages.favoritesContent.favoritesHeader')}</Text>
        </CardItem>
        {favorites.map(fav => (
          <React.Fragment key={Math.random().toString(36).substring(7)}>
            <CardItem>
              <Body>
                <Button rounded disabled style={style.button}>
                  <Text style={style.buttonText}>{fav.value}</Text>
                </Button>
              </Body>
              <Right>
                <Button
                  title="Delete alert"
                  onPress={() => deleteFavorite(fav)}
                >
                  <Text>{t('pages.favoritesContent.deleteButton')}</Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>{fav.showName}</Text>
              </Body>
            </CardItem>
          </React.Fragment>
        ))}
      </Card>
    );
  }


export default FavoritesContent;
