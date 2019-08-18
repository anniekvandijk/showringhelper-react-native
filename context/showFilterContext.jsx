import React from 'react';

const ShowFilterContext = React.createContext([[], () => {}]);

const useShowFilterContext = () => {
  const [showFilter, setShowFilter] = React.useContext(ShowFilterContext);
  return [showFilter, setShowFilter];
};

const ShowFilterProvider = (props) => {
  const [showFilter, setShowFilter] = React.useState([]);
  return (
    <ShowFilterContext.Provider value={[showFilter, setShowFilter]}>
      {props.children}
    </ShowFilterContext.Provider>
  );
};

export { ShowFilterProvider, useShowFilterContext };
