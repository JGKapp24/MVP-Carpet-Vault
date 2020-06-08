const db = require('../../database/index.js');

module.exports = {
  getAllShipments: () => {
    const sqlString = `SELECT shipments.*, carriers.carrier_name
    FROM shipments INNER JOIN carriers
    ON shipments.carrier_id = carriers.carrier_id`;

    return db.query(sqlString);
  },

  getShipmentById: (shipmentId) => {
    const sqlString = `SELECT shipments.*, carriers.carrier_name
    FROM shipments
    JOIN carriers
    ON shipments.carrier_id = carriers.carrier_id
    WHERE shipment_id = $1`;

    return db.query(sqlString, [shipmentId]);
  },

  getCarpetByShipmentId: (shipmentId) => {
    const sqlString = `SELECT cpt.*, v1.vendor_name AS shipper_name, v2.vendor_name AS consignee_name
    FROM carpet cpt
    JOIN vendors v1 ON cpt.shipper_id = v1.vendor_id
    JOIN vendors v2 ON cpt.consignee_id = v2.vendor_id
    WHERE cpt.shipment_id = $1`;

    return db.query(sqlString, [shipmentId]);
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
