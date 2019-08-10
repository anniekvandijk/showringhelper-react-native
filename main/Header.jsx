import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, StatusBar } from 'react-native';
import {
  Header, Left, Body, Title, Button, Icon
} from 'native-base';

const style = StyleSheet.create({
  header: {
    backgroundColor: '#3e2723',
    paddingTop: StatusBar.currentHeight
  }
});

function AppHeader() {
  const [t] = useTranslation();
  return (
    <Header style={style.header}>
      <Left>
        {/* <Button transparent>
          <Icon name="menu" />
        </Button> */}
      </Left>
      <Body>
        <Title>{t('header.title')}</Title>
      </Body>
    </Header>
  );
}

export default AppHeader;
