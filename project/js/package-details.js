// ======= PACKAGE DETAILS JS (FULL UPDATED) =======

const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get("city") || "Unknown City";
const price = parseFloat(urlParams.get("price")) || 0;
const defaultDays = parseInt(urlParams.get("days")) || 1;

const SERVICE_COSTS = {
  breakfast: 30,   
  dinner: 45,     
  tour: 150,       
  transport: 100   
  
};

// ======= CITY IMAGES FOR SLIDER =======
const cityImages = {
  "Paris": [
    "images/images/paris1.jpg",
    "images/images/paris2.jpg",
    "images/images/paris3.jpg",
    "images/images/paris4.jpg",
    "imges/images/paris5.jpg"
  ],
  "London": [
    "images/images/london1.jpg",
    "images/images/london2.jpg",
    "images/images/london3.jpg",
    "images/images/london4.jpg",
    "images/images/london5.jpg"
  ],
  "India": [
    "images/images/india1.jpg",
    "images/images/india2.jpg",
    "images/images/india3.jpg",
    "images/images/india4.jpg",
    "images/images/india5.jpg"
  ],
  "Bangladesh": [
    "images/images/bang1.jpg",
    "images/images/bang2.jpg",
    "images/images/bang3.jpg",
    "images/images/bang4.jpg",
    "images/images/bang5.jpg"
  ],
  "Japan": [
    "images/images/japan1.jpg",
    "images/images/japan2.jpg",
    "images/images/japan3.jpg",
    "images/images/japan4.jpg",
    "images/images/japan5.jpg"
  ],
  "Bali": [
    "images/images/Bali1.jpg",
    "images/images/Bali2.jpg",
    "images/images/Bali3.jpg",
    "images/images/Bali4.jpg",
    "images/images/Bali5.jpg"
  ],
  "Thailand": [
    "images/images/thai1.jpg",
    "images/images/thai2.jpg",
    "images/images/thai3.jpg",
    "images/images/thai4.jpg",
    "images/images/thai5.jpg"
  ],
  "Switzerland": [
    "images/images/swit1.jpg",
    "images/images/swit2.jpg",
    "images/images/swit3.jpg",
    "images/images/swit4.jpg",
    "images/images/swit5.jpg"
  ],
  "Nepal": [
    "images/images/nep1.jpg",
    "images/images/nep2.jpg",
    "images/images/nep3.jpg",
    "images/images/nep4.jpg",
    "images/images/nep5.jpg"
  ],
  "Maldives": [

    "images/images/mal1.jpg",
    "images/images/mal2.jpg",
    "images/images/mal3.jpg",
    "images/images/mal4.jpg",
    "images/images/mal5.jpg"
  ],
  "Rome": [
    "images/images/rome1.jpg",
    "images/images/rome2.jpg",
    "images/images/rome3.jpg",
    "images/images/rome4.jpg",
    "images/images/rome5.jpg"
  ],
  "Paris": [
    "images/images/paris1.jpeg",
    "images/images/paris2.jpeg",
    "images/images/paris3.jpeg",
    "images/images/paris4.jpeg",
    "images/images/paris5.jpeg"
  ]
};

// Populate slider images
function populateSlider(city) {
  const slidesContainer = document.querySelector('.slides');
  if (!slidesContainer) return;
  slidesContainer.innerHTML = ""; // clear previous images
  const images = cityImages[city] || cityImages['default'];
  images.forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Tour Image ${i + 1} - ${city}`;
    slidesContainer.appendChild(img);
  });
}

// ======= DOCUMENT READY =======
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const cityNameEl = document.getElementById("city-name");
  const priceEl = document.getElementById("price");
  const daysEl = document.getElementById("days");
  const totalCostEl = document.getElementById("total-cost");

  const adjustDaysInput = document.getElementById("adjust-days");
  const cbBreakfast = document.getElementById("opt-breakfast");
  const cbDinner = document.getElementById("opt-dinner");
  const cbTour = document.getElementById("opt-tour");
  const cbTransport = document.getElementById("opt-transport");

  const modal = document.getElementById("adjustModal");
  const adjustBtn = document.querySelector(".adjust-btn");
  const closeBtn = document.querySelector(".close");
  const doneBtn = document.querySelector(".update-btn"); 

  // Initial values
  cityNameEl.innerText = `${city} Tour Package`;
  adjustDaysInput.value = defaultDays;
  daysEl.innerText = defaultDays;

  // Populate slider dynamically
  populateSlider(city);

  // ======= COST CALCULATION =======
  function calculateCost() {
    const days = Math.max(1, parseInt(adjustDaysInput.value) || 1);
    let perDayCost = price;
    if (cbBreakfast && cbBreakfast.checked) perDayCost += SERVICE_COSTS.breakfast;
    if (cbDinner && cbDinner.checked) perDayCost += SERVICE_COSTS.dinner;

    let oneTimeCost = 0;
    if (cbTour && cbTour.checked) oneTimeCost += SERVICE_COSTS.tour;
    if (cbTransport && cbTransport.checked) oneTimeCost += SERVICE_COSTS.transport;

    const total = (perDayCost * days) + oneTimeCost;

    priceEl.innerText = perDayCost.toFixed(2);
    daysEl.innerText = days;
    totalCostEl.innerText = total.toFixed(2);

    const svc = (name, checked) => {
      const el = document.querySelector(`[data-service="${name}"]`);
      if (!el) return;
      el.style.display = checked ? "list-item" : "none";
    };
    svc("breakfast", cbBreakfast ? cbBreakfast.checked : false);
    svc("dinner", cbDinner ? cbDinner.checked : false);
    svc("tour", cbTour ? cbTour.checked : false);
    svc("transport", cbTransport ? cbTransport.checked : false);
  }

  if (adjustDaysInput) adjustDaysInput.addEventListener("input", calculateCost);
  [cbBreakfast, cbDinner, cbTour, cbTransport].forEach(cb => {
    if (cb) cb.addEventListener("change", calculateCost);
  });

  calculateCost();

  // ======= MODAL CONTROLS =======
  if (adjustBtn) {
    adjustBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (adjustDaysInput) adjustDaysInput.value = parseInt(daysEl.textContent) || defaultDays;
      modal.style.display = "flex";
      setTimeout(() => {
        if (adjustDaysInput) {
          adjustDaysInput.focus();
          adjustDaysInput.select();
        }
      }, 50);
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", () => modal.style.display = "none");
  if (doneBtn) doneBtn.addEventListener("click", () => {
    calculateCost();
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") modal.style.display = "none";
  });

  if (adjustDaysInput) {
    adjustDaysInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        calculateCost();
        if (modal) modal.style.display = "none";
      }
    });
  }

  // ======= BOOKING MODAL =======
  const bookBtn = document.querySelector('.book-btn');
  const bookingModal = document.getElementById('bookingModal');
  const bookingClose = document.getElementById('bookingClose');

  if (bookBtn && bookingModal) {
    bookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      bookingModal.style.display = 'flex';
    });
  }
  if (bookingClose) bookingClose.addEventListener('click', () => bookingModal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === bookingModal) bookingModal.style.display = 'none';
  });
});
