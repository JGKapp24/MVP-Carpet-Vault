const db = require('../../database/index.js');

module.exports = {
  getAllShipments: () => {
    const sqlString = `SELECT shipments.*, carriers.carrier_name
    FROM shipments INNERJOIN carriers
    ON shipments.carrier_id = carriers.carrier_id`;

    return db.query(sqlString);
  },

  getCarpetByShipmentId: (shipmentId) => {
    const sqlString = `SELECT carpet.*, vendors.vendor_name
    FROM carpet
    INNERJOIN vendors ON carpet.shipper_id = vendors.vendor_id
    WHERE carpet.shipment_id = $1`;

    db.query(sqlString, [shipmentId]);
  },
  updateCarpetTagById: (carpetId, tagNum = null) => {
    const sqlString = 'UPDATE carpet SET tag_num = $1 WHERE carpet_id = $2';
    const sqlValues = [tagNum, carpetId];

    return db.query(sqlString, sqlValues);
  },

  updateCarpetLocationById: (carpetId, location = null) => {
    const sqlString = 'UPDATE carpet SET location = $1 WHERE carpet_id = $2';
    const sqlValues = [location, carpetId];

    return db.query(sqlString, sqlValues);
  },

  updateCarpetRemoverById: (carpetId, remover = null) => {
    const sqlString = 'UPDATE carpet SET removedBy = $1 WHERE carpet_id = $2';
    const sqlValues = [remover, carpetId];

    return db.query(sqlString, sqlValues);
  },
};
