var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sistema de proyecto' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login de usuario' });
});

router.get('/createAccount', function(req, res, next) {
  res.render('createAccount', { title: 'Creacion de cuenta' });
});

module.exports = router;
