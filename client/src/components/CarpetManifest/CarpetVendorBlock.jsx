import React from 'react';

const CarpetVendorBlock = ({ vendorStr }) => {
  const vendors = vendorStr.split('&&');
  const shipper = vendors[0];
  const consignee = vendors[1];

  return (
    <div className="vendor-block">
      <div className="vendor-grid thicker">
        <span>{shipper}</span>
        <span>{consignee}</span>
      </div>
    </div>
  );
};

export default CarpetVendorBlock;
