import React, { useContext, useEffect, useState } from 'react';
import abcardinfo from '../config/abcardinfo';
import Stats from './Stats';
import BuyButton from './BuyButton';
import BuyStats from './BuyStats';
import { getCardDataContract } from './web3/SolidityContracts.js';
import AppContext from './contexts/AppContext';

const ABCard = (props) => {
  const { connection } = useContext(AppContext);
    const [currNum, setCurrNum] = useState(-1);
    const [remainingNum, setRemainingNum] = useState(0)

  useEffect(() => {
    if (!connection || !connection.provider || !connection.currentAddress) {
      return;
    }

    let carddata_contract = getCardDataContract();
    if (carddata_contract !== null) {
      carddata_contract.methods
        .getCurrentTokenNumbers(props.cardId)
        .call()
        .then((result) => {
          setCurrNum(result);
        });

        carddata_contract.methods
            .remainingMintableSupplyForCardSeries(props.cardId)
            .call()
            .then((result) => {
                console.log('remaining for ', props.cardId, result);
                setRemainingNum(parseInt(result, 10))
            });
    }
  }, [connection, props.cardId]);

  return (
    <div className="four wide column">
      <div className="ui fluid raised stackable link card">
        <div className="image">
          <img src={`images/${props.cardId}.png`} alt="card" />
        </div>
        <div className="content">
          <span className="header">
            {' '}
            {abcardinfo.cards[props.cardId].description}{' '}
          </span>
          <div className="meta">
            {props.view !== 'Home' && (
              <span className="left floated">Token ID: {props.id} </span>
            )}
            <span className="right floated">
              {' '}
              {currNum === -1
                ? 'Connect wallet to see'
                              : abcardinfo.cards[props.cardId].max - remainingNum }{' '}
              of Max {abcardinfo.cards[props.cardId].max}{' '}
            </span>
          </div>
        </div>
        <div className="extra content">
          {props.view !== 'Home' && props.cardId < 61 && <Stats />}
          {props.view === 'Home' && props.cardId > 23 && props.cardId < 28 && (
            <Stats red={2} yellow={2} blue={2} power={10} />
          )}
          {props.view === 'Home' && props.cardId < 61 && (
            <BuyStats cardId={props.cardId} />
          )}
        </div>
        <div className="extra content">
          {props.view === 'Home' &&
                      remainingNum > 0 && (
              <BuyButton
                cardId={props.cardId}
                price={abcardinfo.cards[props.cardId].price}
              />
            )}
          {props.view === 'Home' &&
            remainingNum === 0 && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="ui fluid disabled red button">
                  Sold Out{' '}
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ABCard;
