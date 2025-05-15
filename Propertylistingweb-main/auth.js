import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"; 
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"; 

const signupform = document.getElementById("signup-form");
if (signupform) {
  signupform.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("useremail").value;
    let password = document.getElementById("userpassword").value;
    let userconfirmpassword = document.getElementById("userconfirmpassword").value;
    let role = document.getElementById("signup-option").value;
    let status = document.getElementById("status");
    status.innerHTML = "";

    if (!username || !email || !password || !userconfirmpassword || !role) {
      status.innerHTML = '<div class="error">Please Enter All Fields</div>';
      return;
    }

    if (password !== userconfirmpassword) {
      status.innerHTML = '<div class="error">Passwords do not match</div>';
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        status.innerHTML = '<div class="register">Register Successfully</div>';

        const userDoc = doc(db, "users", user.uid);
        setDoc(userDoc, {
          username,
          role,
          email,
        }).then(() => {
          window.location.href = "login.html";
        }).catch((error) => {
          status.innerHTML = `<div class="error">${error.message}</div>`;
        });
      })
      .catch((error) => {
        status.innerHTML = `<div class="error">${error.message}</div>`;
      });
  });
}

const loginform = document.getElementById("login-form");
if (loginform) {
  loginform.addEventListener("submit", (e) => {
    e.preventDefault();

    let email = document.getElementById("useremail").value;
    let password = document.getElementById("userpassword").value;
    let status = document.getElementById("status");
    status.innerHTML = "";

    if (!email || !password) {
      status.innerHTML = '<div class="error">Please Enter All Fields</div>';
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userDoc = doc(db, "users", user.uid);
        getDoc(userDoc).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const role = userData.role;

            if (role === "admin") {
              window.location.href = "admin.html";
            } else {
              window.location.href = "index.html";
            }
          } else {
            status.innerHTML = '<div class="error">No role found for this user</div>';
          }
        }).catch((error) => {
          status.innerHTML = `<div class="error">${error.message}</div>`;
        });
      })
      .catch((error) => {
        status.innerHTML = `<div class="error">${error.message}</div>`;
      });
  });
}
