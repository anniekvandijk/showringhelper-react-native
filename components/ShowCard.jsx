import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Text, Card, CardItem, Body, H1, H2, H3, Button, View } from 'native-base';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  buttons: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#e65100',
    marginTop: 10,
    marginRight: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});

function Chips(values) {
  if (values.length > 0) {
    return values.map(value => (
      <Button rounded disabled key={value} style={style.button}>
        <Text style={style.buttonText}>{value}</Text>
      </Button>
    ));
  }
}

function ShowCard({ show }) {
  const [t] = useTranslation();
  return (
    <Card>
      <CardItem header bordered>
        <H1>{show.name}</H1>
      </CardItem>
      <CardItem bordered>
        <Body>
          <H3>{t('showCard.nextToPrepare')}</H3>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          {
            show.rings.nextToPrepare.description !== '' && <Text>{show.rings.nextToPrepare.description}</Text>
          }

          <View style={style.buttons}>{Chips(show.rings.nextToPrepare.values)}</View>
        </Body>
      </CardItem>
      <CardItem bordered>
        <Body>
          <H3>{t('prepare')}</H3>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          {
            show.rings.prepare.description !== '' && <Text>{show.rings.prepare.description}</Text>
          }
          <View style={style.buttons}>{Chips(show.rings.prepare.values)}</View>
        </Body>
      </CardItem>
      <CardItem bordered>
        <Body>
          <H3>{t('inRing')}</H3>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          {
            show.rings.inRing.description !== '' && <Text>{show.rings.inRing.description}</Text>
          }
          <View style={style.buttons}>{Chips(show.rings.inRing.values)}</View>
        </Body>
      </CardItem>
    </Card>
  );
}

ShowCard.propTypes = {
  show: PropTypes.object.isRequired
};

export default ShowCard;
