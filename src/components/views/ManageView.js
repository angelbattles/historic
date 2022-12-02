import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import HeaderSection from '../HeaderSection';
import { getAllTokens } from '../web3/Utilities';
import LegacyAngelTable from '../LegacyAngelTable';
import LegacyPetTable from '../LegacyPetTable';
import LegacyAccessoryTable from '../LegacyAccessoryTable';
import Stats from '../Stats';
import { cardType } from '../web3/Utilities.js';
import LoadingSpinner from '../LoadingSpinner';
import ManageButton from '../ManageButton.js';
import TransferInfo from '../TransferInfo';
import {
  initLegacyContracts,
  getAllAngels,
  getAllPets,
  getAllAccessories,
} from '../web3/LegacyCards';
import AppContext from '../contexts/AppContext';

const reducer = (prevState, newStates) => ({ ...prevState, ...newStates });

const ManageView = () => {
  const { connection } = useContext(AppContext);
  const [state, setState] = useReducer(reducer, {
    view: 'All',
    tokens: { token: [], id: [] },
    legacyPets: null,
    legacyAngels: null,
    legacyAccessories: null,
    manageToken: 0,
    selectedId: -1,
  });

  const setSelectedId = useCallback(
    (id) => {
      // prevent loop
      if (id === state.selectedId) {
        return;
      }

      state.tokenIds.forEach((tokenId, i) => {
        if (tokenId === id) {
          setState({
            selectedId: tokenId,
            selectedToken: state.tokens[i],
          });
        }
      });
    },
    [state]
  );

  const generateTokenTable = useCallback(() => {
    if (!state.tokens || !state.tokenIds) {
      return <LoadingSpinner />;
    }

    const tokens = state.tokens;
    const tokenIds = state.tokenIds;

    console.log(tokenIds);
      var tokenTable = [];
      const seen = [];
      for (var i = 0; i < tokens.length; i++) {
          if (!seen.includes(tokenIds[i])) {
              seen.push(tokenIds[i])
              tokenTable.push(
                  <tr key={i}>
                      <td data-label="ID">{tokenIds[i]}</td>
                      <td data-label="Type">{cardType[tokens[i].cardSeriesId]}</td>
                      <td data-label="Stats">
                          <Stats
                              power={tokens[i].power}
                              experience={tokens[i].experience}
                              red={tokens[i].auraRed}
                              blue={tokens[i].auraBlue}
                              yellow={tokens[i].auraYellow}
                          />
                      </td>
                      <td data-label="Action">
                          {' '}
                          <ManageButton id={tokenIds[i]} setSelectedId={setSelectedId} />
                      </td>
                  </tr>
              );
          }
    }

    return (
      <table className="ui celled unstackable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Stats</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{tokenTable}</tbody>
      </table>
    );
  }, [setSelectedId, state.tokens, state.tokenIds]);

    useEffect(() => {
      console.log(connection)
    if (!connection || !connection.provider || !connection.currentAddress) {
      return;
    }

    const init = async () => {
      initLegacyContracts(connection.provider, connection.currentAddress);
      const result = await getAllTokens(connection.currentAddress);
      setState({
        tokens: result.ownerTokens,
        tokenIds: result.ownerTokenIds,
      });

        const angels = await getAllAngels();
        setState({legacyAngels: angels})
        const pets = await getAllPets();
        setState({ legacyPets: pets })
        const accessories = await getAllAccessories();
        setState({ legacyAccessories: accessories })
 

    };

    init();
  }, [connection]);

  return (
    <div>
      <div className="ui divider"></div>
      <HeaderSection title="Manage Cards" />
      <div className="ui raised segment">
        <p>On this page you can see and manage all your cards. </p>
        <p>
          Make sure you are connected to the <i className="ethereum icon"></i>{' '}
          ethereum mainnet.
        </p>
        <p>
          You can wrap and unwrap to the pre-721 cards in a non-destructive
          manner.
        </p>
        <p>
          Remember that all 721 cards use one numbering system, while legacy
          angels, pets, and accessories all use their own system.{' '}
        </p>
        <p>
          To manage historical cards (ie, transfer, change name, burn, etc) you
          can connect to etherscan and interact with the{' '}
          <a href="https://etherscan.io/address/0x6d2e76213615925c5fc436565b5ee788ee0e86dc#code">
            angel data contract
          </a>
          , the{' '}
          <a href="https://etherscan.io/address/0xb340686da996b8b3d486b4d27e38e38500a9e926#writeContract">
            pet data contract
          </a>
          , and the{' '}
          <a href="https://etherscan.io/address/0x466c44812835f57b736ef9f63582b8a6693a14d0">
            accessory data contract
          </a>{' '}
          directly.
        </p>
        <p>Select which type of card you want in the dropdown. </p>

        <img
          className="ui centered small image"
          src={`images/site/MyTeam.png`}
          alt="My Team"
        />
        <div className="ui compact menu">
          <div className="ui simple dropdown item">
            Filter by Card Type
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className="item" onClick={() => setState({ view: 'All' })}>
                All Cards
              </div>
              <div
                className="item"
                onClick={() => setState({ view: 'Mainnet' })}
              >
                Wrapped (721) Cards
              </div>
              <div
                className="item"
                onClick={() => setState({ view: 'Legacy' })}
              >
                Historical (Non-721) Cards
              </div>
            </div>
          </div>
        </div>
      </div>
      {state.selectedId !== -1 && (
        <TransferInfo id={state.selectedId} token={state.selectedToken} />
      )}

      <div className="ui divider"></div>
      {(state.view === 'All' || state.view === 'Mainnet') && (
        <div>
          <HeaderSection title="721 Tokens (Ethereum Mainnet)" color="purple" />

          <div className="ui divider"></div>
          {generateTokenTable()}
        </div>
      )}
      <div className="ui divider"></div>
      {(state.view === 'All' || state.view === 'Legacy') && (
        <LegacyAngelTable angels={state.legacyAngels} />
      )}
      <div className="ui divider"></div>
      {(state.view === 'All' || state.view === 'Legacy') && (
        <LegacyPetTable pets={state.legacyPets} view={'Manage'} />
      )}
      <div className="ui divider"></div>
      {(state.view === 'All' || state.view === 'Legacy') && (
        <LegacyAccessoryTable accessories={state.legacyAccessories} />
      )}
    </div>
  );
};

export default ManageView;
