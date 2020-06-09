/* eslint-disable react/prop-types */
import React from 'react';

class CarpetTableEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      removedBy: '',
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleUpdate(e) {
    this.setState({
      removedBy: e.target.value,
    });
  }

  handleClick() {
    const { removedBy } = this.state;
    const { roll, removeRoll } = this.props;

    if (removedBy !== '') {
      removeRoll(roll.carpet_id, removedBy);
    }
  }

  render() {
    const { roll } = this.props;
    const { removedBy } = this.state;
    const { handleUpdate, handleClick } = this;

    return (
      <div className="carpet-grid tagged light-top-border">
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
        <span>
          {roll.tag_num}
        </span>
        <div>
          <input type="text" value={removedBy} className="input-tag" onChange={handleUpdate} />
          <button type="button" className="button-tag" onClick={handleClick}>Remove</button>
        </div>
      </div>
    );
  }
}

export default CarpetTableEntry;
