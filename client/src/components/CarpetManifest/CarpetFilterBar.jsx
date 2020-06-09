import React from 'react';

const CarpetFilterBar = ({ filterSelection, handleFilterChange }) => (
  <div className="filter-bar-grid">
    <span
      role="button"
      tabIndex="0"
      onClick={() => handleFilterChange(0)}
      onKeyPress={() => handleFilterChange(0)}
      className={filterSelection === 0 ? 'filter-selected' : ''}
    >
      Untagged
    </span>
    <span
      role="button"
      tabIndex="0"
      onClick={() => handleFilterChange(1)}
      onKeyPress={() => handleFilterChange(1)}
      className={filterSelection === 1 ? 'filter-selected' : ''}
    >
      Tagged
    </span>
    <span
      role="button"
      tabIndex="0"
      onClick={() => handleFilterChange(2)}
      onKeyPress={() => handleFilterChange(2)}
      className={filterSelection === 2 ? 'filter-selected' : ''}
    >
      Locating
    </span>
    <span
      role="button"
      tabIndex="0"
      onClick={() => handleFilterChange(3)}
      onKeyPress={() => handleFilterChange(3)}
      className={filterSelection === 3 ? 'filter-selected' : ''}
    >
      Complete
    </span>
  </div>
);

export default CarpetFilterBar;
