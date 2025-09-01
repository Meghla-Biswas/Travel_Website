
const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get("city") || "Unknown City";
const price = parseFloat(urlParams.get("price")) || 0;
const defaultDays = parseInt(urlParams.get("days")) || 1;


const SERVICE_COSTS = {
  breakfast: 30,
  dinner: 45,
  tour: 150,
  transport: 100,
};


const cityImages = {
  Paris: [
    "images/images/paris1.jpg",
    "images/images/paris2.jpg",
    "images/images/paris3.jpg",
    "images/images/paris4.jpg",
    "images/images/paris5.jpg",
  ],
  London: [
    "images/images/london1.jpeg",
    "images/images/london2.jpeg",
    "images/images/london3.jpeg",
    "images/images/london4.jpeg",
    "images/images/london5.jpeg",
  ],
  India: [
    "images/images/india1.jpeg",
    "images/images/india2.jpeg",
    "images/images/india3.jpeg",
    "images/images/india4.jpeg",
    "images/images/india5.jpeg",
  ],
  Bangladesh: [
    "images/images/ban1.jpeg",
    "images/images/ban2.jpeg",
    "images/images/ban3.jpeg",
    "images/images/ban4.jpeg",
    "images/images/ban5.jpeg",
  ],
  Japan: [
    "images/images/japan1.jpeg",
    "images/images/japan4.jpeg",
    "images/images/japan3.jpeg",
    "images/images/japan7.jpeg",
    "images/images/japan5.jpeg",
  ],
  Bali: [
    "images/images/Bali1.jpeg",
    "images/images/Bali2.jpeg",
    "images/images/Bali3.jpeg",
    "images/images/Bali4.jpeg",
    "images/images/Bali5.jpeg",
  ],
  Thailand: [
    "images/images/thai1.jpeg",
    "images/images/thai2.jpeg",
    "images/images/thai3.jpeg",
    "images/images/thai4.jpeg",
    "images/images/thai5.jpeg",
  ],
  Switzerland: [
    "images/images/swit1.jpeg",
    "images/images/swit2.jpeg",
    "images/images/swit3.jpeg",
    "images/images/swit4.jpeg",
    "images/images/swit5.jpeg",
  ],
  Nepal: [
    "images/images/nep1.jpeg",
    "images/images/nep2.jpeg",
    "images/images/nep3.jpeg",
    "images/images/nep4.jpeg",
    "images/images/nep5.jpeg",
  ],
  Maldives: [
    "images/images/mal1.jpeg",
    "images/images/mal2.jpeg",
    "images/images/mal3.jpeg",
    "images/images/mal4.jpeg",
    "images/images/mal5.jpeg",
  ],
  Rome: [
    "images/images/rome6.jpeg",
    "images/images/rome7.jpeg",
    "images/images/rome3.jpeg",
    "images/images/rome4.jpeg",
    "images/images/rome5.jpeg",
  ],
};


function populateSlider(city) {
  const slidesContainer = document.querySelector(".slides");
  if (!slidesContainer) return;
  slidesContainer.innerHTML = "";
  const images = cityImages[city] || [];
  images.forEach((url, i) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = `Tour Image ${i + 1} - ${city}`;
    slidesContainer.appendChild(img);
  });
}


let slideIndex = 0;
function startSlider() {
  const slidesContainer = document.querySelector(".slides");
  if (!slidesContainer) return;
  const slides = slidesContainer.querySelectorAll("img");
  if (!slides.length) return;

  slides.forEach((img) => (img.style.display = "none"));
  slides[slideIndex].style.display = "block";
  slideIndex = (slideIndex + 1) % slides.length;
  setTimeout(startSlider, 3000); 
}


document.addEventListener("DOMContentLoaded", () => {
  
  const cityNameEl = document.getElementById("city-name");
  const priceEl = document.getElementById("price");
  const daysEl = document.getElementById("days");
  const totalCostEl = document.getElementById("total-cost");

  const adjustDaysInput = document.getElementById("adjust-days");
  const adjustStartInput = document.getElementById("adjust-start");
  const cbBreakfast = document.getElementById("opt-breakfast");
  const cbDinner = document.getElementById("opt-dinner");
  const cbTour = document.getElementById("opt-tour");
  const cbTransport = document.getElementById("opt-transport");

  const adjustModal = document.getElementById("adjustModal");
  const bookingModal = document.getElementById("bookingModal");

  const adjustCloseBtn = adjustModal.querySelector(".close");
  const doneBtn = adjustModal.querySelector(".update-btn");

  const bookingCloseBtn = bookingModal.querySelector(".close");
  const bookBtn = document.querySelector(".book-btn");
  const bookConfirmBtn = bookingModal.querySelector(".book-confirm");

  const confirmCity = document.getElementById("city-name-confirm");
  const confirmDays = document.getElementById("confirm-days");
  const confirmCost = document.getElementById("confirm-cost");
  const confirmStart = document.getElementById("confirm-start");
  const confirmEnd = document.getElementById("confirm-end");

 
  cityNameEl.innerText = `${city} Tour Package`;
  adjustDaysInput.value = defaultDays;
  daysEl.innerText = defaultDays;
  populateSlider(city);
  startSlider();

 
  function calculateCost() {
    const days = Math.max(1, parseInt(adjustDaysInput.value) || 1);

    
    let perDayCost = price;
    if (cbBreakfast.checked) perDayCost += SERVICE_COSTS.breakfast;
    if (cbDinner.checked) perDayCost += SERVICE_COSTS.dinner;

  
    let oneTimeCost = 0;
    if (cbTour.checked) oneTimeCost += SERVICE_COSTS.tour;
    if (cbTransport.checked) oneTimeCost += SERVICE_COSTS.transport;

    
    const total = perDayCost * days + oneTimeCost;

    
    priceEl.innerText = perDayCost.toFixed(2);
    daysEl.innerText = days;
    totalCostEl.innerText = total.toFixed(2);

    
    const servicesList = document.getElementById("services-list");
    if (!servicesList) return;
    servicesList.innerHTML = "";

    
    const liHotel = document.createElement("li");
    liHotel.textContent = `Hotel: The Taj Palace (${days} nights)`;
    servicesList.appendChild(liHotel);

    if (cbBreakfast.checked) {
      const li = document.createElement("li");
      li.textContent = `Meals: Breakfast 🍳`;
      servicesList.appendChild(li);
    }
    if (cbDinner.checked) {
      const li = document.createElement("li");
      li.textContent = `Meals: Dinner 🍽️`;
      servicesList.appendChild(li);
    }
    if (cbTour.checked) {
      const li = document.createElement("li");
      li.textContent = `City Tour & Guidance 🏛️`;
      servicesList.appendChild(li);
    }
    if (cbTransport.checked) {
      const li = document.createElement("li");
      li.textContent = `Airport Transport 🚗`;
      servicesList.appendChild(li);
    }
  }

  
  [adjustDaysInput, cbBreakfast, cbDinner, cbTour, cbTransport].forEach(
    (el) => {
      el.addEventListener("input", calculateCost);
      if (el.type === "checkbox") el.addEventListener("change", calculateCost);
    }
  );

  calculateCost();

  
  document.querySelectorAll(".adjust-btn").forEach((button) => {
    button.addEventListener("click", () => {
      adjustModal.classList.add("show");
      adjustModal.classList.remove("hide");
      if (adjustDaysInput) {
        adjustDaysInput.focus();
        adjustDaysInput.select();
      }
    });
  });

  
  function closeAdjustModal() {
    adjustModal.classList.remove("show");
    adjustModal.classList.add("hide");
  }
  adjustCloseBtn.addEventListener("click", closeAdjustModal);
  doneBtn.addEventListener("click", () => {
    calculateCost();
    closeAdjustModal();
  });

  adjustDaysInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculateCost();
      closeAdjustModal();
    }
  });

 
  bookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirmCity) confirmCity.textContent = city;
    if (confirmDays) confirmDays.textContent = daysEl.textContent;
    if (confirmCost) confirmCost.textContent = totalCostEl.textContent;

    if (adjustStartInput.value) {
      const startDate = new Date(adjustStartInput.value);
      const duration = parseInt(daysEl.textContent, 10) || 1;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + duration);
      confirmStart.textContent = startDate.toDateString();
      confirmEnd.textContent = endDate.toDateString();
    } else {
      confirmStart.textContent = "Not selected";
      confirmEnd.textContent = "Not calculated";
    }

    bookingModal.classList.add("show");
    bookingModal.classList.remove("hide");
  });

  
  function closeBookingModal() {
    bookingModal.classList.remove("show");
    bookingModal.classList.add("hide");
  }
  bookingCloseBtn.addEventListener("click", closeBookingModal);
  bookConfirmBtn.addEventListener("click", closeBookingModal);

  
  window.addEventListener("click", (e) => {
    if (e.target === adjustModal) closeAdjustModal();
    if (e.target === bookingModal) closeBookingModal();
  });

 
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (adjustModal.classList.contains("show")) closeAdjustModal();
      if (bookingModal.classList.contains("show")) closeBookingModal();
    }
  });

 
  const backArrow = document.querySelector(".back-arrow");
  backArrow?.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.back();
  });
});
// final code
