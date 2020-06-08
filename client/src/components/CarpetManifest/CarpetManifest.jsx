/* eslint-disable no-console */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Header.jsx';
import CarpetShipmentInfo from './CarpetShipmentInfo.jsx';

class CarpetManifest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carpet: [],
      shipment: {},
    };

    this.getShipment = this.getShipment.bind(this);
    this.getCarpetForCurrentShipment = this.getCarpetForCurrentShipment.bind(this);
  }

  componentDidMount() {
    this.getShipment()
      .then(this.getCarpetForCurrentShipment);
  }

  getShipment() {
    const { match: { params } } = this.props;
    const { shipmentId } = params;

    return fetch(`/data/shipments/${shipmentId}`)
      .then((results) => results.json())
      .then((results) => this.setState({
        shipment: results.shipment,
      }))
      .catch((err) => console.log('Error:', err));
  }

  getCarpetForCurrentShipment() {
    const { shipment } = this.state;

    return fetch(`/data/shipments/${shipment.shipment_id}/carpet`)
      .then((results) => results.json())
      .then((results) => this.setState({
        carpet: results.carpet,
      }))
      .catch(console.log);
  }

  render() {
    const { carpet, shipment } = this.state;

    return (
      <div className="carpet-manifest">
        <Header />
        {shipment ? <CarpetShipmentInfo shipment={shipment} /> : ''}
        <hr />
      </div>
    );
  }
}

export default withRouter(CarpetManifest);
