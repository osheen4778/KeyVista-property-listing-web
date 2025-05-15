import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const detailContainer = document.getElementById('property-details');

function getProperty() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadPropertyDetails() {
  const id = getProperty();
  if (!id) {
    detailContainer.innerHTML = "<p>No property ID provided.</p>";
    return;
  }

  const propertyRef = doc(db, "properties", id);
  const propertySnap = await getDoc(propertyRef);

  if (propertySnap.exists()) {
    const data = propertySnap.data();
    detailContainer.innerHTML = `
      <div class="listing" style="display: flex; gap: 20px;">
        <div class="image" style="flex: 1;">
          <img src="${data.imageUrl}" alt="Property" style="width: 100%; height: auto; border-radius: 10px;" />
        </div>
        <div class="details" style="flex: 2;">
          <div class="price-title">
            ₹${Number(data.price).toLocaleString('en-IN')} <span class="subtext">| EMI - ₹59k |</span>
          </div>
          <div class="meta">
            ${data.bhk} ${data.flat || ''} For Sale in Elite Homes, 
            <strong>${data.location}</strong>
          </div>
          <div class="features">
            <div class="feature-item">🛏 ${data.bhk || 'N/A'} Beds</div>
            <div class="feature-item">🛁 3 Baths</div>
            <div class="feature-item">🌇 3 Balconies</div>
            <div class="feature-item">🚪 ${data.furnishing || 'Unfurnished'}</div>
          </div>
          <div class="info-grid">
            <div class="info-item"><strong>Carpet Area:</strong> ${data.area || '1300 sqft'}</div>
            <div class="info-item"><strong>Developer:</strong> Aadhava Developers</div>
            <div class="info-item"><strong>Project:</strong> ${data.project || 'Elite Homes'}</div>
            <div class="info-item"><strong>Floor:</strong> ${data.floor || '2'} (Out of 4 Floors)</div>
            <div class="info-item"><strong>Transaction Type:</strong> ${data.transaction || 'New Property'}</div>
            <div class="info-item"><strong>Status:</strong> ${data.status || 'Ready to Move'}</div>
            <div class="info-item"><strong>Facing:</strong> ${data.facing || 'East'}</div>
            <div class="info-item"><strong>Furnished Status:</strong> ${data.furnishing || 'Unfurnished'}</div>
            <div class="info-item"><strong>Ownership Type:</strong> ${data.ownership || 'Freehold'}</div>
          </div>
          <div class="tags">
            <span class="tag success">✔️ East Facing Property</span>
            <span class="tag info">✨ Newly Constructed Property</span>
          </div>
          <div class="actions">
            <button class="btn primary">Contact Owner</button>
          </div>
        </div>
      </div>`;
  } else {
    detailContainer.innerHTML = "<p>Property not found</p>";
  }
}

loadPropertyDetails();
