import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Text, Card, CardItem, Body, H1, H2, H3, Button, View, Left, Right, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import NumberChip from './NumberChip';

const style = StyleSheet.create({
  header: {
    backgroundColor: '#197b30'
  },
  headerTitle: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  subHeader: {
    fontWeight: 'bold'
  },
  buttons: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    elevation: 0
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

function Chips(values, navigation, showId, showName) {
  if (values.length > 0) {
    return values.map((value) => {
      const startNumber = { showId, showName, value };
      return (
        <NumberChip
          key={showId + value}
          disabled={false}
          startNumber={startNumber}
          onPress={() => navigation.navigate('RingNumberDetail', { showId, value, showName })}
        />
      );
    });
  }
}

function ShowCard({ show, navigation }) {
  const [t] = useTranslation();
  return (
    <Card>
      <CardItem header bordered style={style.header}>
        <Left>
          <Text style={style.headerTitle}>{show.name}</Text>
        </Left>
        <Right>
          <Button
            style={style.button}
            small
            title="Show detail"
            onPress={() => navigation.navigate('ShowDetail', { showId: show.id })}
          >
            <Icon name="arrow-forward" />
          </Button>
        </Right>
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text style={style.subHeader}>{t('components.showCard.nextToPrepare')}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          {
            show.rings.nextToPrepare.description !== '' && <Text>{show.rings.nextToPrepare.description}</Text>
          }

          <View style={style.buttons}>{Chips(show.rings.nextToPrepare.values, navigation, show.id, show.name)}</View>
        </Body>
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text style={style.subHeader}>{t('components.showCard.prepare')}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          {
            show.rings.prepare.description !== '' && <Text>{show.rings.prepare.description}</Text>
          }
          <View style={style.buttons}>{Chips(show.rings.prepare.values, navigation, show.id, show.name)}</View>
        </Body>
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text style={style.subHeader}>{t('components.showCard.inRing')}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          {
            show.rings.inRing.description !== '' && <Text>{show.rings.inRing.description}</Text>
          }
          <View style={style.buttons}>{Chips(show.rings.inRing.values, navigation, show.id, show.name)}</View>
        </Body>
      </CardItem>
    </Card>
  );
}

ShowCard.propTypes = {
  show: PropTypes.object.isRequired
};

export default ShowCard;
