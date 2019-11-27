import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
  Content, Text, Card, CardItem, Body, Left, Right, Button, View
} from 'native-base';
import { useShowContext } from '../context/showContext';
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

  function Chips() {
    const startNumbers = [];
    startNumbers.push(...show.rings.nextToPrepare.values);
    startNumbers.push(...show.rings.prepare.values);
    startNumbers.push(...show.rings.inRing.values);

    if (startNumbers.length > 0) {
      return startNumbers.map((value) => {
        const startNumber = {
          showId: show.id,
          showName: show.name,
          value
        };
        return (
          <NumberChip
            key={show.id + value}
            disabled={false}
            startNumber={startNumber}
            onPress={() => navigation.navigate('RingNumberDetail', { showId:show.id, value, showName:show.name })}
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
