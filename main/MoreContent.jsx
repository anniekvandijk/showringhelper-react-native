import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Content, Button, Text, Card, CardItem, Left, Right, Body, H1 } from 'native-base';
import Header from './Header';

const style = StyleSheet.create({
  content: {
    height: '100%'
  }
});

function MoreContent({ navigation }) {
  const [t] = useTranslation();
  return (
    <>
      <Header title={t('header.title.more')}/>
      <Content padder style={style.content}>
        <Card>
          <CardItem header bordered>
            <H1>{t('moreContent.header')}</H1>
          </CardItem>
          <CardItem bordered>
            <Left>
              <Text>{t('moreContent.privicyPolicy.text')}</Text>
            </Left>
            <Right>
              <Button
                title="Go to Privicy policy"
                onPress={() => navigation.navigate('PrivicyPolicyContent')}
              />
            </Right>
          </CardItem>
        </Card>
      </Content>
    </>
  );
}

export default MoreContent;

