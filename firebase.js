
const toast = document.getElementById('toast');
function showToast(message) { toast.textContent = message; toast.style.display = 'block'; setTimeout(() => toast.style.display='none',3000); }


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

function showMessage(message, success = false) {
  const box = document.getElementById("messageBox");
  box.style.background = success ? "#4CAF50" : "#f44336"; // green for success, red for error
  box.textContent = message;
  box.style.display = "block";
  setTimeout(() => {
    box.style.display = "none";
  }, 4000); // hide after 3 seconds
}

function showCustomConfirm(message) {
  return new Promise((resolve) => {
    const modal = document.getElementById("customConfirm");
    const msg = document.getElementById("confirmMessage");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn = document.getElementById("confirmNo");

    msg.textContent = message;
    modal.style.display = "flex";

    yesBtn.onclick = () => {
      modal.style.display = "none";
      resolve(true);
    };

    noBtn.onclick = () => {
      modal.style.display = "none";
      resolve(false);
    };
  });
}


