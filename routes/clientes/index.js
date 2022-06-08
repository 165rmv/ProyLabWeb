var express = require('express');
var router = express.Router();

var productController = require('../../controllers/clientes')

router.get('/', productController.homePage);

router.get('/about-us', productController.aboutUs);

router.get('/ropa-hombre', productController.men_products);

router.post('/ropa-hombre', productController.men_productsPOST);

router.get('/ropa-mujer', productController.women_products);

router.post('/ropa-mujer', productController.women_productsPOST);

router.get('/product-detail/:id/info', productController.productDetail);

router.post('/product-detail/:id/info', productController.productDetailPOST);

router.get('/visit-us', productController.visitUs);

module.exports = router;