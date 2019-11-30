import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Badge } from 'native-base';
import { StyleSheet } from 'react-native';
import { useFavoritesContext } from '../context/favoritesContext';
import { useNotificationContext } from '../context/NotificationContext';
import FavoriteBadge from './FavoriteBadge';


const style = StyleSheet.create({
  button: {
    backgroundColor: '#197b30',
    marginTop: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    position: 'relative',
    zIndex: -1
  },
  notButton: {
    backgroundColor: '#e56228',
    marginTop: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    position: 'relative',
    zIndex: -1
  },  
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

function NumberChip({startNumber, disabled, onPress}) {
  const [favorites] = useFavoritesContext();
  const [notifications] = useNotificationContext();

  const isNotification = notifications
    && notifications.length > 0
    && notifications.filter(
      x => x.ringNumber === startNumber.value && x.showId === startNumber.showId
    ).length > 0;

  console.log(isNotification);

  const isFavorite = favorites
    && favorites.length > 0
    && favorites.filter(
      x => x.value === startNumber.value && x.showId === startNumber.showId
    ).length > 0;

  if (disabled) {
    return (
      <>
        <Button
          rounded
          disabled
          style={isNotification ? style.button : style.notButton}
        >
          <Text style={style.buttonText}>{startNumber.value}</Text>
        </Button>
        {isFavorite && <FavoriteBadge />}
      </>
    );
  }

  return (
    <>
      <Button
        rounded
        style={isNotification ? style.button : style.notButton}
        onPress={onPress}
      >
        <Text style={style.buttonText}>{startNumber.value}</Text>
      </Button>
      {isFavorite && <FavoriteBadge />}
    </>
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
