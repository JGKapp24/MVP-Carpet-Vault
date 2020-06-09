/* eslint-disable react/prop-types */
import React from 'react';
import CarpetTableEntry from './CarpetTableEntry.jsx';
import CarpetTableHeader from './CarpetTableHeader.jsx';
import CarpetVendorBlock from '../CarpetVendorBlock.jsx';

const LocatingCarpet = ({ carpet, locateRoll }) => {
  let vendorStrs = carpet.map((roll) => `${roll.shipper_name}&&${roll.consignee_name}`);
  vendorStrs = Array.from(new Set(vendorStrs));
  vendorStrs.sort();

  return (
    <div>
      {vendorStrs.map((vendorStr) => (
        <div className="filtered-vendor-roll-block" key={vendorStr}>
          <CarpetVendorBlock vendorStr={vendorStr} />
          <CarpetTableHeader />
          {
            carpet.filter((roll) => `${roll.shipper_name}&&${roll.consignee_name}` === vendorStr)
              .map((roll) => (
                <CarpetTableEntry
                  key={roll.carpet_id}
                  roll={roll}
                  locateRoll={locateRoll}
                />
              ))
          }
        </div>
      ))}
    </div>
  );
};

export default LocatingCarpet;
