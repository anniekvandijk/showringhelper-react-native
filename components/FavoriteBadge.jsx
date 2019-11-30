import React from 'react';
import { Icon, Badge, Text, Button } from 'native-base';
import { Platform, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  button: {
    minWidth: 15,
    minHeight: 15,
    width: 15,
    height: 15,
    borderRadius: 50,
    borderColor: '#e56228',
    backgroundColor: '#fad201',
    borderWidth: 1,
    padding: 5,
    marginLeft: -20,
    marginRight: 5,
    marginBottom: 25,
    zIndex: 1,
    elevation: 10
  },
  iconIos: {
    color: '#fad201',
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 20
  },
  badgeIos: {
    backgroundColor: 'transparent',
    position: 'relative',
    marginLeft: -35,
    padding: 0
  }
});

function FavoriteBadge() {
  if (Platform.OS === 'android') {
    return (
      <Button
        style={style.button}
      >
      </Button>
    );
  }
  return (
    <Badge
      style={style.badgeIos}
    >
      <Text>
        <Icon
          style={style.iconIos}
          name="star"
        />
      </Text>
    </Badge>
  );
}


export default FavoriteBadge;
