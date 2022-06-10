var express = require('express');
var router = express.Router();
var clientesController = require('../controllers/clientes')


/* GET home page. */
router.get('/', clientesController.homePage);


module.exports = router;
