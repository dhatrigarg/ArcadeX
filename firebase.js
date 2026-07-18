import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

  const firebaseConfig = {
  apiKey: "xx",
  authDomain: "xx",
  projectId: "xx",
  storageBucket: "xx",
  messagingSenderId: "xx",
  appId: "xx",
  measurementId: "xx"
};

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  window.signup = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account created!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  window.login = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login successful!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };