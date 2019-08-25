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

  useEffect(() => {
    AsyncStorage
      .getItem('showFilter')
      .then((result) => {
        setShowFilter(result ? JSON.parse(result) : []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
