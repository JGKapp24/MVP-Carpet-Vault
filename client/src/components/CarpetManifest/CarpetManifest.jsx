/* eslint-disable no-console */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Header.jsx';
import CarpetShipmentInfo from './CarpetShipmentInfo.jsx';
import CarpetFilterBar from './CarpetFilterBar.jsx';
import UntaggedCarpet from './Untagged/UntaggedCarpet.jsx';
import TaggedCarpet from './Tagged/TaggedCarpet.jsx';

class CarpetManifest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carpet: [],
      shipment: {},
      filterSelection: 0,
      untagged: [],
      tagged: [],
      locating: [],
      complete: [],
    };

    this.getShipment = this.getShipment.bind(this);
    this.getCarpetForCurrentShipment = this.getCarpetForCurrentShipment.bind(this);
    this.tagRoll = this.tagRoll.bind(this);
    this.removeRoll = this.removeRoll.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filterAllCarpet = this.filterAllCarpet.bind(this);
  }

  componentDidMount() {
    this.getShipment()
      .then(this.getCarpetForCurrentShipment)
      .then(this.filterAllCarpet);
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

  tagRoll(carpetId, tagNum) {
    fetch(`/data/carpet/${carpetId}/tag`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        carpetId,
        tagNum,
      }),
    })
      .then(this.getCarpetForCurrentShipment)
      .then(this.filterAllCarpet)
      .catch(console.log);
  }

  removeRoll(carpetId, removedBy) {
    fetch(`/data/carpet/${carpetId}/remove`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        carpetId,
        removedBy,
      }),
    })
      .then(this.getCarpetForCurrentShipment)
      .then(this.filterAllCarpet)
      .catch(console.log);
  }

  handleFilterChange(filterSelection) {
    this.setState({
      filterSelection,
    });
  }

  filterAllCarpet() {
    const { carpet } = this.state;

    const untagged = carpet.filter((roll) => roll.tag_num === null);
    const tagged = carpet.filter((roll) => roll.tag_num && !roll.removedby);
    const locating = carpet.filter((roll) => roll.tag_num && roll.removedby && !roll.location);
    const complete = carpet.filter((roll) => roll.tag_num && roll.removedby && roll.location);

    this.setState({
      untagged,
      tagged,
      locating,
      complete,
    });
  }

  render() {
    const {
      carpet,
      shipment,
      filterSelection,
      untagged,
      tagged,
      locating,
      complete,
    } = this.state;
    const { tagRoll, removeRoll, handleFilterChange } = this;

    const filteredSelection = () => {
      if (filterSelection === 0) {
        return <UntaggedCarpet tagRoll={tagRoll} carpet={untagged} />;
      }
      if (filterSelection === 1) {
        return <TaggedCarpet removeRoll={removeRoll} carpet={tagged} />;
      }
      return null;
    };

    return (
      <div className="carpet-manifest">
        <Header />
        {shipment ? <CarpetShipmentInfo shipment={shipment} /> : ''}
        <hr />
        <CarpetFilterBar
          filterSelection={filterSelection}
          handleFilterChange={handleFilterChange}
        />
        <div className="vendor-grid thicker tall">
          <span>Shipper</span>
          <span>Consginee</span>
        </div>
        {filteredSelection()}
      </div>
    );
  }
}

export default withRouter(CarpetManifest);
