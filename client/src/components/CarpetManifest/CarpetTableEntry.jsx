import React from 'react';

const CarpetTableEntry = ({ roll }) => (
  <div className="carpet-grid light-top-border">
    <span className="justify-right">
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
    <div>
      <button type="button" className="button-tag">Tag</button>
    </div>
  </div>
);

export default CarpetTableEntry;
