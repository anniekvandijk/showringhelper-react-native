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
    marginBottom: 30,
    zIndex: 1,
    elevation: 10
  }
});

function FavoriteBadge() {
  return (
    <Button 
      style={style.button}
    >
    </Button>
  );
}


export default FavoriteBadge;
