import React from 'react';
import Stats from './Stats';
import HeaderSection from './HeaderSection';
import { cardType, getAura } from './web3/Utilities.js';
import UnlockConvertButton from './UnlockConvertButton';
import LoadingSpinner from './LoadingSpinner';

function LegacyAngelTable(props) {
  let angels = [];
  let aura = { auraRed: 0, auraBlue: 0, auraYellow: 0 };

  if (props.angels === null) {
    return <LoadingSpinner />;
  }

  // filter any duplicates
  const ids = [];

  for (var i = 0; i < props.angels.length; i++) {
    aura = getAura(props.angels[i].aura);

    if (!ids.includes(props.angels[i].angelId)) {
      ids.push(props.angels[i].angelId);

      angels.push(
        <tr key={i}>
          <td data-label="ID">{props.angels[i].angelId}</td>
          <td data-label="Type">
            {cardType[props.angels[i].angelCardSeriesId]}
          </td>
          <td data-label="Stats">
            <Stats
              power={props.angels[i].battlePower}
              experience={props.angels[i].experience}
              red={aura.auraRed}
              blue={aura.auraBlue}
              yellow={aura.auraYellow}
            />
          </td>
          <td data-label="Action">
            <UnlockConvertButton angelId={props.angels[i].angelId} />{' '}
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="ui grid">
      <HeaderSection title="Non-721 Angels" color="blue" />
      {angels.length === 0 && <div> None Found </div>}
      <table className="ui celled unstackable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Stats</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{angels}</tbody>
      </table>
    </div>
  );
}
export default LegacyAngelTable;
