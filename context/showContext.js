import React from 'react';

const showContext = React.createContext({
  shows: null
});

const useShowContext = () => {
  const { shows } = React.useContext(showContext);
  return shows;
};

export { showContext, useShowContext };
