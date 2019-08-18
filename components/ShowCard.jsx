import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Text, Card, CardItem, Body, H1, H2, H3, Button, View } from 'native-base';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  header: {
    backgroundColor: '#197b30'
  },
  headerTitle: {
    color: '#ffffff'
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
      <CardItem header bordered style={style.header}>
        <H2 style={style.headerTitle}>{show.name}</H2>
      </CardItem>
      <CardItem bordered>
        <Body>
          <H3 style={style.subHeader}>{t('showCard.nextToPrepare')}</H3>
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
          <H3 style={style.subHeader}>{t('showCard.prepare')}</H3>
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
          <H3 style={style.subHeader}>{t('showCard.inRing')}</H3>
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
