import React from 'react';
import PropTypes from 'prop-types';
import {
  Header, Left, Right, Body, Title, Button, Icon
} from 'native-base';

function AppHeader({ title, showBack, navigation }) {
  return (
    <Header>
      <Left>
        {showBack
          && (
          <Button
            vertical
            transparent
            title="Go back"
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" />
          </Button>
          )
        }
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  showBack: PropTypes.bool
};

AppHeader.defaultProps = {
  showBack: false
};


export default AppHeader;
