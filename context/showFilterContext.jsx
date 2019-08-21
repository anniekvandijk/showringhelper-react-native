import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';

const ShowFilterContext = React.createContext([[], () => {}]);

const useShowFilterContext = () => {
  const [showFilter, setShowFilter] = React.useContext(ShowFilterContext);
  return [showFilter, setShowFilter];
};

const ShowFilterProvider = ({ children }) => {
  const [showFilter, setShowFilter] = React.useState([]);

  async function getFilter() {
    await AsyncStorage.getItem('showFilter', (err, result) => {
      console.log('savedDataJSON', result);
      const filter = (result) ? JSON.parse(result) : [];
      console.log('filter', filter);
      return filter;
    });
  }

  useEffect(() => {
    AsyncStorage.setItem('showFilter', JSON.stringify(showFilter), () => {
      AsyncStorage.getItem('showFilter', (err, result) => {
        console.log('get showFilter', result);
      });
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
