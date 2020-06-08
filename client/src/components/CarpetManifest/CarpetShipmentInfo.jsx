import React from 'react';

const CarpetShipmentInfo = ({ shipment }) => {
  let shipDate = new Date(shipment.ship_date);
  shipDate = shipDate.toDateString();

  return (
    <div className="shipment-info">
      <span>
        Carrier:
        {' '}
        {shipment.carrier_name}
      </span>
      <span>
        Trailer Number:
        {' '}
        {shipment.trailer_num}
      </span>
      <span>
        Ship Date:
        {' '}
        {shipDate}
      </span>
      <span>
        Load Number:
        {' '}
        {shipment.load_num}
      </span>
    </div>
  );
};

export default CarpetShipmentInfo;
