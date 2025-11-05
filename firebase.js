// /js/firebase.js
const firebaseConfig = {
    apiKey: "AIzaSyBzysGJIiGLD17bb8_FrvOeDVqP9ogjfzw",
    authDomain: "unite-3409c.firebaseapp.com",
    databaseURL: "https://unite-3409c-default-rtdb.firebaseio.com",
    projectId: "unite-3409c",
    storageBucket: "unite-3409c.appspot.com",
    messagingSenderId: "608397760209",
    appId: "1:608397760209:web:03c05605ebe5c1999b17f0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();



