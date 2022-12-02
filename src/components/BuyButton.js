import React, { useContext, useState, useEffect } from 'react';
import { getCardDataContract } from './web3/SolidityContracts';
import AppContext from './contexts/AppContext';

function BuyButton(props) {
  const { connection, transactions } = useContext(AppContext);
  const [mintingPaused, setMintingPaused] = useState(false);

  useEffect( async () => {
    if (!connection) {
      return;
    }
      let carddata_contract = await getCardDataContract();

      if (carddata_contract !== null) {
          carddata_contract.methods
              .mintingPaused()
              .call()
              .then((result) => {
                  console.log(result)
                  setMintingPaused(result);
              });
      }
  }, [connection]);



  const handleClick = (e) => {
    const carddata_contract = getCardDataContract();
    e.preventDefault();
    console.log(props);

    if (!connection) {
      return;
    }

    transactions
      .trackTransaction(
        'buybutton_' + props.cardId,
        carddata_contract.methods
          .buyCard(props.cardId)
          .send({ from: connection.currentAddress, value: props.price })
      )
      .on('transactionHash', function (hash) {
        console.log('Transaction hash: ', hash);
      })
      .on('receipt', function (receipt) {
        console.log('Receipt:', receipt);
      });
  };

  if (mintingPaused) {
    return <button className="ui fluid grey button">Minting Paused </button>;
  }

  return !transactions.isTransactionPending('buybutton_' + props.cardId) ? (
    <button className="ui green fluid button" onClick={handleClick}>
      Mint for {props.price / 1000000000000000000} ETH{' '}
    </button>
  ) : (
    <button className="ui green fluid button loading"></button>
  );
}

export default BuyButton;
