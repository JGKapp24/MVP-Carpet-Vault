/* eslint-disable no-console */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Header.jsx';
import CarpetShipmentInfo from './CarpetShipmentInfo.jsx';
import CarpetTableHeader from './CarpetTableHeader.jsx';
import CarpetTableEntry from './CarpetTableEntry.jsx';
import CarpetVendorBlock from './CarpetVendorBlock.jsx';
import CarpetFilterBar from './CarpetFilterBar.jsx';

class CarpetManifest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carpet: [],
      shipment: {},
      vendorCombinations: [],
      filterSelection: 0,
    };

    this.getShipment = this.getShipment.bind(this);
    this.getCarpetForCurrentShipment = this.getCarpetForCurrentShipment.bind(this);
    this.collectVendorCombinations = this.collectVendorCombinations.bind(this);
    this.tagRoll = this.tagRoll.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.getShipment()
      .then(this.getCarpetForCurrentShipment)
      .then(this.collectVendorCombinations);
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

  collectVendorCombinations() {
    const { carpet } = this.state;

    let vendorStrs = carpet.map((roll) => `${roll.shipper_name}&&${roll.consignee_name}`);
    vendorStrs = Array.from(new Set(vendorStrs));
    vendorStrs.sort();

    this.setState({
      vendorCombinations: vendorStrs,
    });
  }

  tagRoll(carpetId, tagNum) {
    fetch(`/data/carpet/${carpetId}/tag`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        carpetId,
      }),
    })
      .then(this.getCarpetForCurrentShipment)
      .catch(console.log);
  }

  handleFilterChange(filterSelection) {
    this.setState({
      filterSelection,
    });
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const { carpet, shipment, vendorCombinations, filterSelection } = this.state;
    const { tagRoll, handleFilterChange } = this;

    return (
      <div className="carpet-manifest">
        <Header />
        {shipment ? <CarpetShipmentInfo shipment={shipment} /> : ''}
        <hr />
        <CarpetFilterBar filterSelection={filterSelection} handleFilterChange={handleFilterChange} />
        <div className="vendor-grid thicker tall">
          <span>Shipper</span>
          <span>Consginee</span>
        </div>
        {vendorCombinations.map((vendorStr) => (
          <div className="filtered-vendor-roll-block" key={vendorStr}>
            <CarpetVendorBlock vendorStr={vendorStr} />
            <CarpetTableHeader />
            {
              carpet.filter((roll) => `${roll.shipper_name}&&${roll.consignee_name}` === vendorStr)
                .map((roll) => (
                  <CarpetTableEntry
                    key={roll.carpet_id}
                    roll={roll}
                    tagRoll={tagRoll}
                  />
                ))
            }
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(CarpetManifest);
