import React from 'react';
import HeaderSection from './HeaderSection';
import { cardType } from './web3/Utilities.js';
import UnlockConvertButton from './UnlockConvertButton';
import LoadingSpinner from './LoadingSpinner';

function LegacyAccessoryTable(props) {
  let accessories = [];
  let type = 0;

  if (props.accessories === null) {
    return <LoadingSpinner />;
  }
  const ids = [];
  for (var i = 0; i < props.accessories.length; i++) {
    type = parseInt(props.accessories[i].AccessorySeriesID, 10) + 42;
    //Legacy Accessory series starts from 1.
    if (!ids.includes(props.accessories[i].accessoryID)) {
      ids.push(props.accessories[i].accessoryID);
      accessories.push(
        <tr key={i}>
          <td data-label="ID">{props.accessories[i].accessoryID}</td>
          <td data-label="Type">{cardType[type]}</td>
          <td data-label="Action">
            <UnlockConvertButton
              accessoryId={props.accessories[i].accessoryID}
            />{' '}
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="ui grid">
      <HeaderSection title="Non-721 Accessories" color="blue" />
      {accessories.length === 0 && <div> None Found </div>}
      <table className="ui celled unstackable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{accessories}</tbody>
      </table>
    </div>
  );
}
export default LegacyAccessoryTable;
