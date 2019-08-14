import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Thumbnail, Header, Left, Right, Body, Title
} from 'native-base';

function AppHeader() {
  const [t] = useTranslation();
  return (
    <Header>
      <Left><Thumbnail square small source={require('../images/icon_round.png')} /></Left>
      <Body>
        <Title>{t('header.title.rings')}</Title>
      </Body>
      <Right />
    </Header>
  );
}

export default AppHeader;
