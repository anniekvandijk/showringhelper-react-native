import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  Text, Card, CardItem, Button, Left,
  Right, Body, Content
} from 'native-base';
import { useFavoritesContext } from '../context/favoritesContext';
import NumberChip from '../components/NumberChip';

const style = StyleSheet.create({
  content: {
    height: '100%'
  }
});

function FavoritesContent({ navigation }) {
  const [t] = useTranslation();
  const [favorites, setFavorites] = useFavoritesContext();

  function deleteFavorite(favorite) {
    setFavorites(favorites.filter(x => x !== favorite));
  }

    return (
      <Content padder style={style.content}>
      <Card>
        {favorites.map(fav => (
          <React.Fragment key={Math.random().toString(36).substring(7)}>
            <CardItem>
              <Body>
                <NumberChip
                  disabled={false}
                  startNumber={{ value: fav.value, showId: fav.showId, showName: fav.showName }}
                  onPress={() => navigation.navigate('RingNumberDetail', { showId: fav.showId, value: fav.value, showName: fav.showName })}
                />
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
      </Content>
    );
  }


export default FavoritesContent;
