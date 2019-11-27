import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';

const FavoritesContext = React.createContext([[], () => {}]);

const useFavoritesContext = () => {
  const [favorites, setFavorites] = React.useContext(FavoritesContext);
  return [favorites, setFavorites];
};

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = React.useState(null);

  useEffect(() => {
    AsyncStorage
      .getItem('favorites')
      .then((result) => {
        setFavorites(result ? JSON.parse(result) : []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (favorites) {
      AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }
    console.log('favorites set');
    console.log(favorites);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={[favorites, setFavorites]}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.object.isRequired
};

export { FavoritesProvider, useFavoritesContext };
