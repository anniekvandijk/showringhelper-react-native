import React from 'react';
import { Icon, Badge, Text, Button } from 'native-base';
import { Platform, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  icon: {
    color: '#fad201',
    backgroundColor: '#ffffff',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 20
  },
  button: {
    //backgroundColor: '#197b30',
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    position: 'relative',
    margin: 0,
    paddingLeft: -30,
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
        rounded
        small
        bordered
        transparent
        style={style.button}
      >
        <Text>
          <Icon
            style={style.icon}
            name="star"
          />
        </Text>
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
