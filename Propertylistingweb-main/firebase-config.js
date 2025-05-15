import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBV7RBdv1KWo2PBJRwxIauK6n4QwpJeN_8",
  authDomain: "propertylisting-b3f1b.firebaseapp.com",
  projectId: "propertylisting-b3f1b",
  storageBucket: "propertylisting-b3f1b.appspot.com",
  messagingSenderId: "497005372548",
  appId: "1:497005372548:web:645afba53cebe9dec54ed1",
  measurementId: "G-G1HDDRGF8K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
