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

function NumberChip({value, showId, showName, disabled, onPress}) {
  const [favorites] = useFavoritesContext();
  console.log(favorites);
  const fav = { showId, showName, value };
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(favorites.length > 0 && favorites.indexOf(fav) > -1);
  }, [favorites]);

  if (disabled) {
    return (
      <Button
        rounded
        disabled
        style={style.button}
      >
        <Text style={style.buttonText}>{value}</Text>
        {favorite && <FavoriteIcon />}
      </Button>
    );
  }

  return (
    <Button
      rounded
      style={style.button}
      onPress={onPress}
    >
      <Text style={style.buttonText}>{value}</Text>
      {favorite && <FavoriteIcon />}
    </Button>
  );
}

NumberChip.propTypes = {
  value: PropTypes.string.isRequired,
  showId: PropTypes.string.isRequired,
  showName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onPress: PropTypes.function  
};

export default NumberChip;
