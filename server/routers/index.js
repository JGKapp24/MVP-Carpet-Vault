const router = require('express').Router();
const controllers = require('../controllers/index.js');

router.get('/shipments', controllers.getAllShipments);

router.get('/shipments/:shipmentId/carpet', controllers.getCarpetByShipmentId);

router.put('/carpet/:carpetId/tag', controllers.updateCarpetTagById);

router.put('/carpet/:carpetId/remove', controllers.updateCarpetRemoverById);

router.put('/carpet/:carpetId/locate', controllers.updateCarpetLocationById);

module.exports = router;
