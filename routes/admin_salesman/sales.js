var express = require('express');
var router = express.Router();
let salesController = require('../../controllers/admin_salesman/sales');


router.get('/', salesController.sales_list);

router.get('/add', salesController.salesman_list);

router.post('/add', salesController.makeASale);

router.get('/:id/details', salesController.details_sale);

module.exports = router;