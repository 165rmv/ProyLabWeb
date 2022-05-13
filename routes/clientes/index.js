var express = require('express');
var router = express.Router();

var productController = require('../../controllers/clientes')

router.get('/', function(req, res) {
    res.render('clientes/index', {title: 'Bienvenido'});
});

router.get('/about-us', function(req, res) {
    res.render('clientes/aboutUs', {title: 'Quiénes somos'});
});

router.get('/ropa-hombre', productController.men_products);

router.get('/ropa-hombre/:id/info', productController.menProductDetail);

router.get('/ropa-mujer', productController.women_products);

router.get('/ropa-mujer/:id/info', productController.womenProductDetail);

router.get('/visit-us', function(req, res) {
    res.render('clientes/visitUs', {title: 'Visita nuestras sucursales'});
});

module.exports = router;