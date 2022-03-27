var express = require('express');
var router = express.Router();
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
//console.log("hello account")


const signupForm = document.querySelector('#sign-up-form'); 

const auth = getAuth(); 

signupForm.addEventListener('submit', (e)=>{
    e.preventDefault(); 
    //gets user info
    const email = signupForm['#sign-up-mail'].value; 
    const password = signupForm['#sign-up-pass'].value;
    console.log(email, password)
    //signing users up
    auth.createUserWithEmailAndPassword(email, password)
    .then(cred=>{
        console.log(cred)
    })

})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('createAccount', { title: 'Registro de usuarios' });
});



module.exports = router;