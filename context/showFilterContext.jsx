import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';

const ShowFilterContext = React.createContext([[], () => {}]);

const useShowFilterContext = () => {
  const [showFilter, setShowFilter] = React.useContext(ShowFilterContext);
  return [showFilter, setShowFilter];
};

async function getShowFilter() {
  await AsyncStorage
    .getItem('showFilter')
    .then((result) => {
      console.log('savedDataJSON', result);
      const filter = (result) ? JSON.parse(result) : [];
      console.log('filter', filter);
      return filter;
    })
    .catch((error) => {
      console.log(error);
    });
}

const ShowFilterProvider = ({ children }) => {
  const [showFilter, setShowFilter] = React.useState([]);

  useEffect(() => {
    AsyncStorage
      .setItem('showFilter', JSON.stringify(showFilter))
      .then(() => {
        AsyncStorage.getItem('showFilter')
          .then((result) => {
            console.log('set showFilter', result);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showFilter]);

  return (
    <ShowFilterContext.Provider value={[showFilter, setShowFilter]}>
      {children}
    </ShowFilterContext.Provider>
  );
};

ShowFilterProvider.propTypes = {
  children: PropTypes.object.isRequired
};

export { ShowFilterProvider, useShowFilterContext };
