import React from 'react';
import Header from '../Header.jsx';
import ShipmentTableHeader from './ShipmentTableHeader.jsx';
import ShipmentTableEntry from './ShipmentTableEntry.jsx';

class Shipments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shipments: [],
    };

    this.getAllShipments = this.getAllShipments.bind(this);
  }

  componentDidMount() {
    this.getAllShipments();
  }

  getAllShipments() {
    fetch('/data/shipments')
      .then((results) => results.json())
      .then((results) => this.setState({
        shipments: results.shipments,
      }))
      .catch(console.log);
  }

  render() {
    const { shipments } = this.state;

    return (
      <div className="shipments">
        <Header />
        <h1>Current Shipments</h1>
        <p>Click on any Load Number to begin manifesting for that trailer.</p>
        <ShipmentTableHeader />
        {shipments.map((shipment) => (
          <ShipmentTableEntry key={shipment.shipment_id} shipment={shipment} />
        ))}
      </div>
    );
  }
}

export default Shipments;
