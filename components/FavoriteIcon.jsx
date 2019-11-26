import React from 'react';
import { Icon } from 'native-base';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  icon: {
    color: '#ffeb00',
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0
  }
});


function FavoriteIcon() {
  return (
    <Icon style={style.icon} name="star" />
  );
}

export default FavoriteIcon;
