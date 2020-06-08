import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ShipmentTableEntry = ({ shipment }) => {
  let shipDate = new Date(shipment.ship_date);
  shipDate = shipDate.toDateString();

  return (
    <div className="shipment-grid">
      <div className="start-link-grid-el">
        <Link to={`/shipments/${shipment.shipment_id}/carpet`} className="start-link">
          <span>{shipment.shipment_id}</span>
        </Link>
      </div>
      <div>{shipment.trailer_num}</div>
      <div>{shipDate}</div>
      <div>{shipment.carrier_name}</div>
    </div>
  );
};

export default ShipmentTableEntry;
