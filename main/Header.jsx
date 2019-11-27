import React from 'react';
import PropTypes from 'prop-types';
import {
  Header, Left, Right, Body, Title, Button, Icon
} from 'native-base';

function AppHeader({ title, showBack, navigation, children }) {
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
      <Right>{children}</Right>
    </Header>
  );
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  showBack: PropTypes.bool,
  navigation: PropTypes.object
};

AppHeader.defaultProps = {
  showBack: false,
  navigation: null
};


export default AppHeader;
