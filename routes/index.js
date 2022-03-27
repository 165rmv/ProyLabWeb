//script(src='https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js')
//script(src='https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js')
//script(src='https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js')
const { initializeApp } = require("firebase/app");
var express = require('express');
var router = express.Router();

var firebaseApp = initializeApp({
  apiKey: "AIzaSyB0XIahCPxe842fD44YCAbTn8goc8n3Trs",
  authDomain: "proylabweb.firebaseapp.com",
  projectId: "proylabweb",
  storageBucket: "proylabweb.appspot.com",
  messagingSenderId: "566349775687",
  appId: "1:566349775687:web:420349f2e81251a3a04262",
  measurementId: "G-R3QZ815MBG"
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sistema de proyecto' });
});

router.get('/createAccount', function(req, res, next) {
  res.render('createAccount', { title: 'Creacion de cuenta' });
});

module.exports = router;
