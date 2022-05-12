let express = require('express');
let router = express.Router()
let inventoryControllerAPI = require('../../controllers/api/inventoryControllerAPI');

router.get('/', inventoryControllerAPI.inventario_list);

module.exports = router;