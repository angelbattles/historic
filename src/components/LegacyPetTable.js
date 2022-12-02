import React from 'react';
import Stats from './Stats';
import HeaderSection from './HeaderSection';
import { cardType } from './web3/Utilities.js';
import UnlockConvertButton from './UnlockConvertButton';
import LoadingSpinner from './LoadingSpinner';

function LegacyPetTable(props) {
  let pets = [];
  let petType = 0;

  if (props.pets === null) {
    return <LoadingSpinner />;
  }

  // filter any duplicates
  const ids = [];

  for (var i = 0; i < props.pets.length; i++) {
    petType = parseInt(props.pets[i].petCardSeriesId, 10) + 23;
    if (!ids.includes(props.pets[i].petId)) {
      ids.push(props.pets[i].petId);
      pets.push(
        <tr key={i}>
          <td data-label="ID">{props.pets[i].petId}</td>
          <td data-label="Type">{cardType[petType]}</td>
          <td data-label="Stats">
            <Stats
              power={props.pets[i].luck}
              red={props.pets[i].auraRed}
              blue={props.pets[i].auraBlue}
              yellow={props.pets[i].auraYellow}
            />
          </td>
          <td data-label="Action">
            {' '}
            <UnlockConvertButton petId={props.pets[i].petId} />{' '}
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="ui grid">
      <HeaderSection title="Non-721 Pets" color="blue" />
      {pets.length === 0 && <div> None Found </div>}
      <table className="ui celled unstackable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Stats</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{pets}</tbody>
      </table>
    </div>
  );
}
export default LegacyPetTable;
