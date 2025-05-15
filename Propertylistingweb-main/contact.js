// contact.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Extract adminId from URL
const urlParams = new URLSearchParams(window.location.search);
const adminId = urlParams.get('adminId');

// Form handling
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const source = document.getElementById("source").value;
  const comments = document.getElementById("comments").value;

  if (!adminId) {
    alert("Missing admin reference.");
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      adminId,
      name: `${firstName} ${lastName}`,
      phone,
      email,
      source,
      comments,
      timestamp: new Date()
    });

    alert("Your message has been sent to the property owner!");
    form.reset();
  } catch (error) {
    console.error("Error submitting contact form: ", error);
    alert("Error! Could not send your message.");
  }
});
