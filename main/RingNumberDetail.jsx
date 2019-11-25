import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
  Content, Text, Card, CardItem, Body, Left, Right, Button
} from 'native-base';
import { useRingNumbersContext } from '../context/ringNumbersContext';

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

function RingNumberDetail(props) {
  const [t, i18n] = useTranslation();
  const value = props.navigation.getParam('value');
  const showId = props.navigation.getParam('showId');
  const ringNumbers = useRingNumbersContext();
  const showNumbers = ringNumbers.filter(x => x.showId === showId);
  const arrayOfNumbers = showNumbers && showNumbers[0].ringnumbers;
  const detailValues = arrayOfNumbers && arrayOfNumbers.filter(x => x.number === value);
  const arrayOfDetails = detailValues && detailValues[0].values;
  const language = i18n.language;


  return (
    <>
      <Content padder style={style.content}>
        <Card>
          <CardItem bordered>
            <Body>
              <Text style={style.buttonText}>{t('pages.ringNumberDetail.header')}</Text>
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
          {arrayOfDetails.map((values) => {
            return (
              <CardItem key={Math.random().toString(36).substring(7)}>
                <Left><Text>{language === 'nl' ? values.nl : values.en}</Text></Left>
                <Body><Text>{values.value}</Text></Body>
              </CardItem>
            );
          })
        }
        </Card>
      </Content>
    </>
  );
}

export default RingNumberDetail;
