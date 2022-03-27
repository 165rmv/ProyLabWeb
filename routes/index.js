const { initializeApp } = require("firebase-admin/app");
//import { initializeApp } from 'firebase/app';

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sistema de proyecto' });
});

router.get('/createAccount', function(req, res, next) {
  res.render('createAccount', { title: 'Creacion de cuenta' });
});

module.exports = router;
