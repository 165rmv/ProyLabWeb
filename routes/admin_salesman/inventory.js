var express = require('express');
var router = express.Router();
let inventoryController = require('../../controllers/admin_salesman/inventory');

// Inventario
router.get('/', inventoryController.inventory_list);
router.get('/add', inventoryController.inventory_create_get);
router.post('/add', inventoryController.inventory_create_post);
router.get('/:id/edit', inventoryController.inventory_update_get);
router.post('/:id/edit', inventoryController.inventory_update_post);
router.post('/:id/delete', inventoryController.inventory_delete_product_post);


// Productos
router.get('/allProducts', inventoryController.productos_list);
router.get('/addProduct', inventoryController.product_create_get);
router.post('/addProduct', inventoryController.product_create_post);
router.get('/allProducts/:id/editProduct', inventoryController.productos_update_get);
router.post('/allProducts/:id/editProduct', inventoryController.productos_update_post);
router.post('/allProducts/:id/delete', inventoryController.products_delete_products_post);



module.exports = router;