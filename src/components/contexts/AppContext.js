import React from 'react';
import useConnection from '../web3/useConnection';
import useTransactions from '../hooks/useTransactions';

const AppContext = React.createContext({});

const AppContextProvider = (props) => {
  /********************************************************************
   * Connection
   ********************************************************************/
  const connection = useConnection();

  /********************************************************************
   * Transaction
   ********************************************************************/
  const transactions = useTransactions(connection);

  return (
    <AppContext.Provider
      value={{
        connection,
        transactions,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppContextProvider };
