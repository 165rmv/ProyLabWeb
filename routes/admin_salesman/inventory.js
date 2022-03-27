var express = require('express');
var router = express.Router();
let inventoryController = require('../../controllers/admin_salesman/inventory');


router.get('/', inventoryController.inventory_list);

router.get('/add', function(req, res, next) {
    res.render('admin_salesman/inventory/add', {title: 'Agregar producto'});
});

router.get('/edit', function(req, res, next) {
    res.render('admin_salesman/inventory/edit', {title: 'Editar producto'});
});

module.exports = router;