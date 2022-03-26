import { initializeApp } from 'firebase/app'; 

const firebaseApp = initializeApp({
  apiKey: "AIzaSyB0XIahCPxe842fD44YCAbTn8goc8n3Trs",
  authDomain: "proylabweb.firebaseapp.com",
  projectId: "proylabweb",
  storageBucket: "proylabweb.appspot.com",
  messagingSenderId: "566349775687",
  appId: "1:566349775687:web:420349f2e81251a3a04262",
  measurementId: "G-R3QZ815MBG"
});

const app = getAuth(firebaseApp); 

//import { initializeApp } from 'https://www.gstatic.com/firebase.js/9.0.0/firebase-app.js'; 

//const db = getFirestore(firebaseApp); 

onAuthStateChanged(auth, user =>{
  if(user != null){
    console.log('logged-in'); 
  }else{
    console.log('No user'); 
  }
});
