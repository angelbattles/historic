import React from 'react';

function PowerStats(props) {
  return (
    <span className="ui right aligned">
      <i className="yellow bolt icon"> </i>
      Power Min:
      {props.cardId >= 4 && 100 + (props.cardId - 4) * 10}
      {props.cardId === 0 && 50}
      {props.cardId === 1 && 120}
      {props.cardId === 2 && 250}
      {props.cardId === 3 && 300}
    </span>
  );
}
export default PowerStats;
