import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import {
  Header, Left, Body, Title, Button, Icon
} from 'native-base';

const style = StyleSheet.create({
  header: {
    backgroundColor: '#3e2723',
    marginTop: StatusBar.currentHeight
  }
});

function AppHeader() {
  return (
    <Header style={style.header}>
      <Left>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Showring helper</Title>
      </Body>
    </Header>
  );
}

export default AppHeader;
