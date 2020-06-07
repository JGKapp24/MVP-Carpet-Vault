const models = require('../models/index.js');

module.exports = {
  getAllShipments: (req, res) => {
    models.getAllShipments()
      .then((results) => results.rows)
      .then((shipments) => res.status(200).json({
        message: 'Successfully retrieved shipments',
        shipments,
      }))
      .catch((error) => res.status(400).json({
        message: 'Failed to get shipments',
        error,
      }));
  },
  getCarpetByShipmentId: (req, res) => {
    const { shipmentId } = req.query;

    if (shipmentId) {
      models.getCarpetByShipmentId(shipmentId)
        .then((results) => results.rows)
        .then((carpet) => res.status(200).json({
          message: 'Successfully retrieved carpet for shipment',
          carpet,
        }))
        .catch((error) => res.status(400).json({
          message: 'failed to retrieve carpet',
          error,
        }));
    } else {
      res.status(400).json({
        message: 'bad request - must be a shipmentId',
      });
    }
  },
  updateCarpetTagById: (req, res) => {
    models.updateCarpetTagById(req.params.carpetId, req.body.tagNum)
      .then(() => res.status(200).json({
        message: 'Successfully updated tag',
      }))
      .catch((error) => res.status(400).json({
        message: 'Failed to update tag',
        error,
      }));
  },
  updateCarpetLocationById: (req, res) => {
    models.updateCarpetLocationById(req.params.carpetId, req.body.location)
      .then(() => res.status(200).json({
        message: 'Successfully updated location',
      }))
      .catch((error) => res.status(400).json({
        message: 'Failed to update location',
        error,
      }));
  },
  updateCarpetRemoverById: (req, res) => {
    models.updateCarpetRemoverById(req.params.carpetId, req.body.location)
      .then(() => res.status(200).json({
        message: 'Successfully updated remover',
      }))
      .catch((error) => res.status(400).json({
        message: 'Failed to update remover',
        error,
      }));
  },
};
