//import { initializeApp } from 'firebase/app'; 
//var initializeApp = require('firebase/app');
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

//const app = getAuth(firebaseApp); 
/*
onAuthStateChanged(auth, user =>{
  if(user != null){
    console.log('logged-in'); 
  }else{
    console.log('No user'); 
  }
});
*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('clientes/index', { title: 'Aesthetic Fashion' });
});

router.get('/createAccount', function(req, res, next) {
  res.render('createAccount', { title: 'Creacion de cuenta' });
});

module.exports = router;
