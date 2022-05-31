let express = require('express');
let router = express.Router()
let tiendasControllerAPI = require('../../controllers/api/tiendasControllerAPI');

router.get('/', tiendasControllerAPI.tiendas_list);

module.exports = router;