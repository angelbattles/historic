import React from 'react';

function Stats(props) {
  return (
    <div>
      <span>
        {' '}
        <i className="red fire icon"></i> {props.red || 0}{' '}
      </span>
      <span>
        {' '}
        <i className="blue tint icon"> </i> {props.blue || 0}{' '}
      </span>
      <span>
        {' '}
        <i className="yellow sun icon"> </i> {props.yellow || 0}{' '}
      </span>
      <span>
        {' '}
        <i className="bolt icon"> </i> {props.power || 0}{' '}
      </span>
      <span>
        {' '}
        <i className="graduation cap icon"> </i>
        {props.experience || 0}{' '}
      </span>
    </div>
  );
}
export default Stats;
