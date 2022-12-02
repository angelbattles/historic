import React from 'react';

function ManageButton(props) {

  return (
    <button
      className="ui orange button"
      onClick={() => {
        props.setSelectedId(props.id);
      }}
    >
      {' '}
      Manage
    </button>
  );
}

export default ManageButton;
