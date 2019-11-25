import React from 'react';

const ringNumbersContext = React.createContext({
  ringnumbers: null
});

const useRingNumbersContext = () => {
  const { ringNumbers } = React.useContext(ringNumbersContext);
  return ringNumbers;
};

export { ringNumbersContext, useRingNumbersContext };
