import React from 'react';
import { Icon, Badge, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  icon: {
    color: '#fad201',
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 20
  },
  badge: {
    //backgroundColor: '#197b30',
    backgroundColor: 'transparent',
    position: 'relative',
    marginLeft: -35,
    padding: 0
  }
});


function FavoriteBadge() {
  return (
    <Badge
      style={style.badge}
    >
      <Text>
        <Icon
          style={style.icon}
          name="star"
        />
      </Text>
    </Badge>
  );
}

export default FavoriteBadge;
