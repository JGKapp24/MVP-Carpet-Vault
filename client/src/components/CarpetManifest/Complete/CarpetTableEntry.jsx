/* eslint-disable react/prop-types */
import React from 'react';

const CarpetTableEntry = ({ roll, undo }) => (
  <div className="carpet-grid complete light-top-border">
    <span className="justify-right">
      <button
        type="button"
        className="button-tag undo"
        onClick={() => undo(roll.carpet_id, 'locate')}
      >
        Undo
      </button>
      {roll.piece_qty}
    </span>
    <span>
      {roll.roll_num}
    </span>
    <span className="justify-center">
      {`${roll.roll_width ? roll.roll_width.toFixed(2) : '0.00'} X ${roll.roll_length ? roll.roll_length.toFixed(2) : '0.00'}`}
    </span>
    <span>
      {roll.roll_yards.toFixed(2)}
    </span>
    <span>
      {roll.tag_num}
    </span>
    <span>
      {roll.removedby}
    </span>
    <span>
      {roll.location}
    </span>
  </div>
);

export default CarpetTableEntry;
