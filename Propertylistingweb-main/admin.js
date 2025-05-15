import { auth, db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const propertyList = document.getElementById("property-list");
  const searchInput = document.getElementById("search");
  const sortBySelect = document.getElementById("sortBy");
  const propertyForm = document.getElementById("property-form");

  let properties = [];

  async function fetchProperties() {
    try {
      const user = auth.currentUser;
      if (user) {
        const adminId = user.uid;
        const q = query(
          collection(db, "properties"),
          where("adminId", "==", adminId),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        properties = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          properties.push(data);
        });
        displayProperties(properties);
      }
    } catch (error) {
      console.error("Error fetching properties: ", error);
    }
  }

  function displayProperties(propertiesToDisplay) {
    if (!propertyList) return;
    propertyList.innerHTML = "";
    propertiesToDisplay.forEach((property) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${property.title}</strong> - ${property.location} - ₹${property.price}<br>
          <small>${property.category} | ${property.bhk}</small><br>
          <p>${property.description}</p>
          <img src="${property.imageUrl}" width="100" style="margin-top: 5px; border-radius: 4px;">
        </div>
      `;
      propertyList.appendChild(li);
    });
  }

  function filterProperties(query) {
    const filteredProperties = properties.filter((property) =>
      property.title.toLowerCase().includes(query) ||
      property.description.toLowerCase().includes(query) ||
      property.location.toLowerCase().includes(query)
    );
    displayProperties(filteredProperties);
  }

  function sortProperties(sortBy) {
    let sortedProperties = [...properties];
    if (sortBy === "price-asc") {
      sortedProperties.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sortedProperties.sort((a, b) => b.price - a.price);
    } else if (sortBy === "title-asc") {
      sortedProperties.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
      sortedProperties.sort((a, b) => b.title.localeCompare(a.title));
    }
    displayProperties(sortedProperties);
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      filterProperties(query);
    });
  }

  if (sortBySelect) {
    sortBySelect.addEventListener("change", (e) => {
      const sortBy = e.target.value;
      sortProperties(sortBy);
    });
  }

  if (propertyForm) {
    propertyForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const location = document.getElementById("location").value;
      const price = document.getElementById("price").value;
      const category = document.querySelector('input[name="category"]:checked')?.value;
      const flatBhk = document.getElementById("flatbhk").value;
      const imageUrl = document.getElementById("imageUrl").value;

      if (category && flatBhk && imageUrl) {
        try {
          const user = auth.currentUser;
          const adminId = user ? user.uid : null;

          await addDoc(collection(db, "properties"), {
            adminId,
            title,
            description,
            location,
            price,
            category,
            bhk: flatBhk,
            imageUrl,
            createdAt: serverTimestamp(),
          });

          alert("Property added successfully!");
          fetchProperties(); 
        } catch (error) {
          console.error("Error adding property: ", error);
          alert("Error adding property.");
        }
      } else {
        alert("Please fill out all required fields.");
      }
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      alert(`Logged in as: ${user.email}`);
      fetchProperties();
    } else {
      window.location.href = "login.html";
    }
  });
});
