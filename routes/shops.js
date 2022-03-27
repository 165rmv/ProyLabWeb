var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('shops', { title: 'Sucursales' });
});

  module.exports = router;