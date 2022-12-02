import { useReducer } from 'react';

const reducer = (prevState, newStates) => ({ ...prevState, ...newStates });

const useTransactions = (connection) => {
  const [transactions, setTransactions] = useReducer(reducer, {});

  const transactionReceiptAsync = async function (
    transactionName,
    transactionHash
  ) {
    if (!connection) {
      return;
    }

    await connection.provider.eth.getTransactionReceipt(
      transactionHash,
      (error, receipt) => {
        if (error) {
          // clear failed transaction
          setTransactions({ [transactionName]: null });
        } else if (receipt == null) {
          // retry (loop)
          setTimeout(
            () => transactionReceiptAsync(transactionName, transactionHash),
            1000
          );
        } else {
          // return the receipt
          setTransactions({ [transactionName]: null });
        }
      }
    );
  };

  const trackTransaction = (transactionName, transaction) => {
    setTransactions({ [transactionName]: 'pending' });

    transaction
      // Assign transactionHash to transaction name
      .on('transactionHash', function (transactionHash) {
        setTransactions({ [transactionName]: transactionHash });
        transactionReceiptAsync(transactionName, transactionHash).finally(
          () => {}
        );
      })
      // Remove transactionHash assigned to transaction name
      .finally(() => {
        setTransactions({ [transactionName]: null });
      });

    return transaction;
  };

  const isTransactionPending = (transactionName) => {
    return !!transactions[transactionName];
  };

  return { trackTransaction, isTransactionPending };
};

export default useTransactions;
