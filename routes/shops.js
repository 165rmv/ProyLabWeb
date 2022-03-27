var express = require('express');
var router = express.Router();

router.get('/shops', function(req, res, next) {
    res.render('shops', { title: 'Sucursales' });
});
  
  module.exports = router;