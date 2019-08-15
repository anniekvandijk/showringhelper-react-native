import React from 'react';
import PropTypes from 'prop-types';
import {
  Thumbnail, Header, Left, Right, Body, Title
} from 'native-base';

function AppHeader({ title }) {
  return (
    <Header>
      <Left><Thumbnail square small source={require('../images/icon_round.png')} /></Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired
};


export default AppHeader;
