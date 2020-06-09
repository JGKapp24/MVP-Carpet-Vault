import React from 'react';

const CarpetShipmentInfo = ({ shipment }) => {
  let shipDate = new Date(shipment.ship_date);
  shipDate = shipDate.toDateString();

  return (
    <div className="shipment-info">
      <div className="shipment-info-grid">
        <span>
          Carrier:
        </span>
        <span>
          {shipment.carrier_name}
        </span>
      </div>
      <div className="shipment-info-grid">
        <span>
          Trailer Number:
        </span>
        <span>
          {shipment.trailer_num}
        </span>
      </div>
      <div className="shipment-info-grid">
        <span>
          Ship Date:
        </span>
        <span>
          {shipDate}
        </span>
      </div>
      <div className="shipment-info-grid">
        <span>
          Load Number:
        </span>
        <span>
          {shipment.load_num}
        </span>
      </div>
    </div>
  );
};

export default CarpetShipmentInfo;
