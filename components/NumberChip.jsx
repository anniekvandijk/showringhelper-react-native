import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { useFavoritesContext } from '../context/favoritesContext';
import FavoriteIcon from './FavoriteIcon';


const style = StyleSheet.create({
  button: {
    backgroundColor: '#e56228',
    marginTop: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

function NumberChip({startNumber, disabled, onPress}) {
  const [favorites] = useFavoritesContext();
  const isFavorite = favorites
    && favorites.length > 0
    && favorites.filter(
      x => x.value === startNumber.value && x.showId === startNumber.showId
    ).length > 0;

  if (disabled) {
    return (
      <Button
        rounded
        disabled
        style={style.button}
      >
        <Text style={style.buttonText}>{startNumber.value}</Text>
        {isFavorite && <FavoriteIcon />}
      </Button>
    );
  }

  return (
    <Button
      rounded
      style={style.button}
      onPress={onPress}
    >
      <Text style={style.buttonText}>{startNumber.value}</Text>
      {isFavorite && <FavoriteIcon />}
    </Button>
  );
}

NumberChip.propTypes = {
  startNumber: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func
};

NumberChip.defaultProps = {
  onPress: () => {}
};

export default NumberChip;
