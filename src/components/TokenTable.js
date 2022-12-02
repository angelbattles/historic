import React from 'react';
import Stats from './Stats';
import HeaderSection from './HeaderSection';
import { cardType } from './web3/Utilities.js';
import LoadingSpinner from './LoadingSpinner';

function TokenTable(props) {
  let tokens = [];
  let currentId = 0;
  console.log(props);
  for (var i = 0; i < props.tokens.token.length; i++) {
    currentId = props.tokens.id[i];
    tokens.push(
      <tr key={i}>
        <td data-label="ID">{props.tokens.id[i]}</td>
        <td data-label="Type">
          {cardType[props.tokens.token[i].cardSeriesId]}
        </td>
        <td data-label="Stats">
          <Stats
            power={props.tokens.token[i].power}
            experience={props.tokens.token[i].experience}
            red={props.tokens.token[i].auraRed}
            blue={props.tokens.token[i].auraBlue}
            yellow={props.tokens.token[i].auraYellow}
          />
        </td>
        <td data-label="Action">
          {' '}
          <button
            className="ui orange button"
            onClick={() => props.manageTokenSelect(parseInt(currentId, 10))}
          >
            Manage
          </button>{' '}
        </td>
      </tr>
    );
  }

  return (
    <div>
      {props.title !== 'none' && (
        <HeaderSection title="721 Tokens (Ethereum Mainnet)" color="purple" />
      )}
      {tokens.length === 0 && <LoadingSpinner />}
      <div className="ui divider"></div>
      <table className="ui celled unstackable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Stats</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{tokens}</tbody>
      </table>
    </div>
  );
}
export default TokenTable;
