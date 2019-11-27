import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
  Content, Text, Card, CardItem, Body, Left, Right, Button, View
} from 'native-base';
import { useShowContext } from '../context/showContext';
import { useRingNumbersContext } from '../context/ringNumbersContext';
import NumberChip from '../components/NumberChip';

const style = StyleSheet.create({
  content: {
    height: '100%'
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

function ShowDetail({ navigation }) {
  const [t, i18n] = useTranslation();
  const transferedShowId = navigation.getParam('showId');
  const shows = useShowContext();
  const show = shows && shows.filter(x => x.id === transferedShowId)[0];
  const ringNumbers = useRingNumbersContext();

  const showRingNumbers = ringNumbers && show && ringNumbers.filter(x => x.showId === show.id);

  function Chips() {
    if (showRingNumbers.length > 0) {
      const numberslist = showRingNumbers[0].ringnumbers;
      numberslist.sort((a, b) => parseFloat(a.number) - parseFloat(b.number));
      return numberslist.map((value) => {
        const startNumber = {
          showId: show.id,
          showName: show.name,
          value: value.number
        };
        return (
          <NumberChip
            key={Math.random().toString(36).substring(2, 15)}
            disabled={false}
            startNumber={startNumber}
            onPress={() => navigation.navigate('RingNumberDetail', { showId: show.id, value: value.number, showName: show.name })}
          />
        );
      });
    }
  }

  return (
    <>
      <Content padder style={style.content}>
        <Card>
          <CardItem>
            <Body>
              <Text style={style.buttonText}>{show.name}</Text>
              <Text>{show.location}</Text>
              {/* <Text style={style.buttonText}>{show.startDate}</Text> */}
            </Body>
          </CardItem>
          <CardItem bordered header>
            <Text>{t('pages.showDetail.ringNumbersHeader')}</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <View style={style.buttons}>{Chips()}</View>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </>
  );
}

export default ShowDetail;
