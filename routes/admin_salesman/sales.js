var express = require('express');
var router = express.Router();
let salesController = require('../../controllers/admin_salesman/sales');


router.get('/', salesController.sales_list);

router.get('/add', function(req, res, next) {
    res.render('admin_salesman/sales/add', {title: 'Agregar producto'});
});

router.get('/details', function(req, res, next) {
    res.render('admin_salesman/sales/details', {title: 'Editar producto'});
});

module.exports = router;