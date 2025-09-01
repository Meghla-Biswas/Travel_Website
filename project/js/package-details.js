
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


function populateSlider(cityName) {
  const slidesContainer = document.querySelector('.slides');
  if (!slidesContainer) return;
  slidesContainer.innerHTML = "";
  const images = cityImages[cityName] || [];
  images.forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Tour Image ${i + 1} - ${cityName}`;
    slidesContainer.appendChild(img);
  });
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.style.display = "flex";
  
  requestAnimationFrame(() => modalEl.classList.add("show"));
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove("show");
  modalEl.classList.add("hide");
  setTimeout(() => {
    modalEl.style.display = "none";
    modalEl.classList.remove("hide");
  }, 300); 
}


document.addEventListener("DOMContentLoaded", () => {
 
  const cityNameEl   = document.getElementById("city-name");
  const priceEl      = document.getElementById("price");
  const daysEl       = document.getElementById("days");
  const totalCostEl  = document.getElementById("total-cost");

  
  const adjustDaysInput = document.getElementById("adjust-days");
  const cbBreakfast     = document.getElementById("opt-breakfast");
  const cbDinner        = document.getElementById("opt-dinner");
  const cbTour          = document.getElementById("opt-tour");
  const cbTransport     = document.getElementById("opt-transport");

  
  const adjustModal = document.getElementById("adjustModal");
  const adjustBtn   = document.querySelector(".adjust-btn");
  const adjustCloseBtn = adjustModal ? adjustModal.querySelector(".close") : null; // scoped!
  const doneBtn     = document.querySelector(".update-btn");

  
  const bookBtn        = document.querySelector('.book-btn');
  const bookingModal   = document.getElementById('bookingModal');
  const bookingClose   = document.getElementById('bookingClose');
  const bookConfirmBtn = bookingModal ? bookingModal.querySelector('.book-confirm') : null;

  
  if (cityNameEl) cityNameEl.innerText = `${city} Tour Package`;
  if (adjustDaysInput) adjustDaysInput.value = defaultDays;
  if (daysEl) daysEl.innerText = defaultDays;

  populateSlider(city);

  
  function calculateCost() {
    const days = Math.max(1, parseInt(adjustDaysInput?.value, 10) || 1);
    let perDayCost = price;
    if (cbBreakfast?.checked) perDayCost += SERVICE_COSTS.breakfast;
    if (cbDinner?.checked)    perDayCost += SERVICE_COSTS.dinner;

    let oneTimeCost = 0;
    if (cbTour?.checked)      oneTimeCost += SERVICE_COSTS.tour;
    if (cbTransport?.checked) oneTimeCost += SERVICE_COSTS.transport;

    const total = (perDayCost * days) + oneTimeCost;

    if (priceEl)     priceEl.innerText = perDayCost.toFixed(2);
    if (daysEl)      daysEl.innerText = days;
    if (totalCostEl) totalCostEl.innerText = total.toFixed(2);

   
    const svc = (name, checked) => {
      const el = document.querySelector(`[data-service="${name}"]`);
      if (el) el.style.display = checked ? "list-item" : "none";
    };
    svc("breakfast", !!cbBreakfast?.checked);
    svc("dinner",    !!cbDinner?.checked);
    svc("tour",      !!cbTour?.checked);
    svc("transport", !!cbTransport?.checked);
  }

 
  adjustDaysInput?.addEventListener("input", calculateCost);
  [cbBreakfast, cbDinner, cbTour, cbTransport].forEach(cb => cb?.addEventListener("change", calculateCost));
  calculateCost();

 
  adjustBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    if (adjustDaysInput && daysEl) {
      adjustDaysInput.value = parseInt(daysEl.textContent, 10) || defaultDays;
    }
    openModal(adjustModal);
    setTimeout(() => {
      if (adjustDaysInput) {
        adjustDaysInput.focus();
        adjustDaysInput.select();
      }
    }, 120);
  });

  adjustCloseBtn?.addEventListener("click", () => closeModal(adjustModal));

  doneBtn?.addEventListener("click", () => {
    calculateCost();
    closeModal(adjustModal);
  });

  
  window.addEventListener("click", (e) => {
    if (e.target === adjustModal) closeModal(adjustModal);
    if (e.target === bookingModal) closeModal(bookingModal);
  });

 
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (adjustModal?.classList.contains("show")) closeModal(adjustModal);
      if (bookingModal?.classList.contains("show")) closeModal(bookingModal);
    }
  });

  
  adjustDaysInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculateCost();
      closeModal(adjustModal);
    }
  });

  
  bookBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    
    const cityNameConfirm = document.getElementById("city-name-confirm");
    const confirmDays     = document.getElementById("confirm-days");
    const confirmCost     = document.getElementById("confirm-cost");

    if (cityNameConfirm) cityNameConfirm.textContent = city;
    if (confirmDays && daysEl) confirmDays.textContent = daysEl.textContent;
    if (confirmCost && totalCostEl) confirmCost.textContent = totalCostEl.textContent;

    openModal(bookingModal);
  });

  bookingClose?.addEventListener('click', () => closeModal(bookingModal));
  bookConfirmBtn?.addEventListener('click', () => closeModal(bookingModal));

  const backArrow = document.querySelector('.back-arrow');
  backArrow?.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.back();
  });
});
