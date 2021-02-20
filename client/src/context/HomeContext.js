import React, { createContext, useState } from 'react';

const HomeContext = createContext();
const { Provider } = HomeContext;

const HomeProvider = ({ children }) => {
  
    const  [homeStatus, setHomeStatus ] = useState(true)

    const setHome = () => {
        setHomeStatus(true)
    }
    
    const setAwayHome = () => {
        setHomeStatus(false)
    }

    const isHome = () => {
        if (homeStatus) {
            return true
        }
    }

    return (
    <Provider
      value={{
        isHome,
        setAwayHome,
        setHome
      }}
    >
      {children}
    </Provider>
  );
};

export { HomeContext, HomeProvider };