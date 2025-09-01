

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


const cityImages = {
  "Paris": [
    "images/images/paris1.jpg",
    "images/images/paris2.jpg",
    "images/images/paris3.jpg",
    "images/images/paris4.jpg",
    "imges/images/paris5.jpg"
  ],
  "London": [
    "images/images/london1.jpeg",
    "images/images/london2.jpeg",
    "images/images/london3.jpeg",
    "images/images/london4.jpeg",
    "images/images/london5.jpeg"
  ],
  "India": [
    "images/images/india1.jpeg",
    "images/images/india2.jpeg",
    "images/images/india3.jpeg",
    "images/images/india4.jpeg",
    "images/images/india5.jpeg"
  ],
  "Bangladesh": [
    "images/images/ban1.jpeg",
    "images/images/ban2.jpeg",
    "images/images/ban3.jpeg",
    "images/images/ban4.jpeg",
    "images/images/ban5.jpeg"
  ],
  "Japan": [
    "images/images/japan1.jpeg",
    "images/images/japan4.jpeg",
    "images/images/japan3.jpeg",
    "images/images/japan7.jpeg",
    "images/images/japan5.jpeg"
  ],
  "Bali": [
    "images/images/Bali1.jpeg",
    "images/images/Bali2.jpeg",
    "images/images/Bali3.jpeg",
    "images/images/Bali4.jpeg",
    "images/images/Bali5.jpeg"
  ],
  "Thailand": [
    "images/images/thai1.jpeg",
    "images/images/thai2.jpeg",
    "images/images/thai3.jpeg",
    "images/images/thai4.jpeg",
    "images/images/thai5.jpeg"
  ],
  "Switzerland": [
    "images/images/swit1.jpeg",
    "images/images/swit2.jpeg",
    "images/images/swit3.jpeg",
    "images/images/swit4.jpeg",
    "images/images/swit5.jpeg"
  ],
  "Nepal": [
    "images/images/nep1.jpeg",
    "images/images/nep2.jpeg",
    "images/images/nep3.jpeg",
    "images/images/nep4.jpeg",
    "images/images/nep5.jpeg"
  ],
  "Maldives": [
    "images/images/mal1.jpeg",
    "images/images/mal2.jpeg",
    "images/images/mal3.jpeg",
    "images/images/mal4.jpeg",
    "images/images/mal5.jpeg"
  ],
  "Rome": [
    "images/images/rome6.jpeg",
    "images/images/rome7.jpeg",
    "images/images/rome3.jpeg",
    "images/images/rome4.jpeg",
    "images/images/rome5.jpeg"
  ],
  "Paris": [
    "images/images/paris1.jpeg",
    "images/images/paris2.jpeg",
    "images/images/paris3.jpeg",
    "images/images/paris4.jpeg",
    "images/images/paris5.jpeg"
  ]
};


function populateSlider(city) {
  const slidesContainer = document.querySelector('.slides');
  if (!slidesContainer) return;
  slidesContainer.innerHTML = ""; 
  const images = cityImages[city] || cityImages['default'];
  images.forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Tour Image ${i + 1} - ${city}`;
    slidesContainer.appendChild(img);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  
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

 
  cityNameEl.innerText = `${city} Tour Package`;
  adjustDaysInput.value = defaultDays;
  daysEl.innerText = defaultDays;

 
  populateSlider(city);

  
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

 
  const backArrow = document.querySelector('.back-arrow');
  if (backArrow) {
    backArrow.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.back();
    });
  }
});
