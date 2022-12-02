import React, { useContext, useEffect, useReducer } from 'react';
import {
  getAngelLockStatus,
  getAccessoryLockStatus,
  getAccessoryContract,
  getAngelContract,
  initLegacyContracts,
} from './web3/LegacyCards';
import { getCardDataContract } from './web3/SolidityContracts';
import AppContext from './contexts/AppContext';

const reducer = (prevState, newStates) => ({ ...prevState, ...newStates });

const UnlockConvertButton = (props) => {
  const { connection, transactions } = useContext(AppContext);

  const [state, setState] = useReducer(reducer, {
    button: 'Loading...',
    color: 'gray',
    //Whichever id is 0 or greater will let us know what type of card we are unlocking or converting.
    angelId: -1,
    petId: -1,
    accessoryId: -1,
  });

  useEffect(() => {
    if (!connection.provider) {
      return;
    }

    initLegacyContracts(connection.provider, connection.currentAddress);
  }, [connection]);

  const handleClick = (angelId, petId, accessoryId, button) => (e) => {
    e.preventDefault();

    let angelContract = getAngelContract();
    let accessoryContract = getAccessoryContract();
    console.log(accessoryContract);
    let carddata_contract = getCardDataContract();
    //Claim an angel if it's unlocked
    if (angelId >= 0 && button === 'Wrap') {
      transactions
        .trackTransaction(
          `unlockconvertbutton_${angelId}_${petId}_${accessoryId}`,
          carddata_contract.methods
            .wrapAngel(angelId)

            .send({ from: connection.currentAddress })
        )
        .on('transactionHash', function (hash) {
          console.log(hash);
        })
        .on('receipt', function (receipt) {
          // receipt example
          console.log(receipt);
        });
    }
    //Unlock an angel if it's locked.
    if (angelId >= 0 && button === 'Unlock') {
      transactions
        .trackTransaction(
          `unlockconvertbutton_${angelId}_${petId}_${accessoryId}`,
          angelContract.methods
            .updateAngelLock(angelId, 0)
            .send({ from: connection.currentAddress })
        )
        .on('transactionHash', function (hash) {
          console.log(hash);
        })
        .on('receipt', function (receipt) {
          // receipt example
          console.log(receipt);
        });
    }

    //wrap a pet
    if (petId >= 0) {
      transactions
        .trackTransaction(
          `unlockconvertbutton_${angelId}_${petId}_${accessoryId}`,
          carddata_contract.methods
            .wrapPet(petId)
            .send({ from: connection.currentAddress })
        )
        .on('transactionHash', function (hash) {
          console.log(hash);
        })
        .on('receipt', function (receipt) {
          // receipt example
          console.log(receipt);
        });
    }

    //wrap an accessory if it's unlocked
    if (accessoryId >= 0 && button === 'Wrap') {
      transactions
        .trackTransaction(
          `unlockconvertbutton_${angelId}_${petId}_${accessoryId}`,
          carddata_contract.methods
            .wrapAccessory(accessoryId)
            .send({ from: connection.currentAddress })
        )
        .on('transactionHash', function (hash) {
          console.log(hash);
        })
        .on('receipt', function (receipt) {
          // receipt example
          console.log(receipt);
        });
    }
    //Unlock an accessory if it's locked.
    if (accessoryId >= 0 && button === 'Unlock') {
      transactions
        .trackTransaction(
          `unlockconvertbutton_${angelId}_${petId}_${accessoryId}`,
          accessoryContract.methods
            .updateAccessoryLock(accessoryId, 0)
            .send({ from: connection.currentAddress })
        )
        .on('transactionHash', function (hash) {
          console.log(hash);
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          console.log(receipt);
        })
        .on('receipt', function (receipt) {
          // receipt example
          console.log(receipt);
        });
    }
  };

  useEffect(() => {
    if (props.angelId) {
      setState({ angelId: props.angelId });
    }
    if (props.petId) {
      setState({ petId: props.petId });
    }
    if (props.accessoryId) {
      setState({ accessoryId: props.accessoryId });
    }

    //Angel buttons should be either unlock or wrap, depending if the card is locked.
    if (props.angelId >= 0) {
      getAngelLockStatus(props.angelId).then(function (result) {
        if (result === true) {
          setState({ button: 'Unlock', color: 'blue' });
        }
        if (result === false) {
          setState({ button: 'Wrap', color: 'green' });
        }
      });
    }

    //Pet buttons will always be green since pets aren't locked.
    if (props.petId >= 0) {
      setState({ button: 'Wrap', color: 'green' });
    }

    //Accessory buttons should be either unlock or convert, depending if the card is locked.
    if (props.accessoryId >= 0) {
      getAccessoryLockStatus(props.accessoryId).then(function (result) {
        if (result === true) {
          setState({ button: 'Unlock', color: 'blue' });
        }
        if (result === false) {
          setState({ button: 'Wrap', color: 'green' });
        }
      });
    }
  }, [props]);

  return !transactions.isTransactionPending(
    `unlockconvertbutton_${state.angelId}_${state.petId}_${state.accessoryId}`
  ) ? (
    <button
      className={`ui ${state.color} button`}
      onClick={handleClick(
        state.angelId,
        state.petId,
        state.accessoryId,
        state.button
      )}
    >
      {state.button}
    </button>
  ) : (
    <button className={`ui ${state.color} button loading`}>
      {state.button}
    </button>
  );
};
export default UnlockConvertButton;
