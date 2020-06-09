/* eslint-disable react/prop-types */
import React from 'react';

class CarpetTableEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tagInput: '',
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleUpdate(e) {
    this.setState({
      tagInput: e.target.value,
    });
  }

  handleClick() {
    const { tagInput } = this.state;
    const { roll, tagRoll } = this.props;

    if (tagInput !== '') {
      tagRoll(roll.carpet_id, tagInput);
    }
  }

  render() {
    const { roll } = this.props;
    const { tagInput } = this.state;
    const { handleUpdate, handleClick } = this;

    return (
      <div className="carpet-grid untagged light-top-border">
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
          <input type="text" value={tagInput} className="input-tag" onChange={handleUpdate} />
          <button type="button" className="button-tag" onClick={handleClick}>Tag</button>
        </div>
      </div>
    );
  }
}

export default CarpetTableEntry;
