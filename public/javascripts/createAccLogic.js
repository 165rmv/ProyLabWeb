//const createAccount = require('../../views/createAccount.pug'); 
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

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
