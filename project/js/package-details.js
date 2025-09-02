
const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get("city") || "Unknown City";
const price = parseFloat(urlParams.get("price")) || 100;
const defaultDays = parseInt(urlParams.get("days")) || 1;


const SERVICE_COSTS = {
  breakfast: 30,
  dinner: 45,
  tour: 150,
  transport: 100,
};


const ROOM_COST_MULTIPLIER = {
  single: 0.8,
  double: 1,
  suite: 1.5,
};


const cityImages = {
  Paris: ["images/images/paris1.jpg","images/images/paris2.jpg","images/images/paris3.jpg","images/images/paris4.jpg","images/images/paris5.jpg"],
  London: ["images/images/london1.jpeg","images/images/london2.jpeg","images/images/london3.jpeg","images/images/london4.jpeg","images/images/london5.jpeg"],
  India: ["images/images/india1.jpeg","images/images/india2.jpeg","images/images/india3.jpeg","images/images/india4.jpeg","images/images/india5.jpeg"],
  Bangladesh: ["images/images/ban1.jpeg","images/images/ban2.jpeg","images/images/ban3.jpeg","images/images/ban4.jpeg","images/images/ban5.jpeg"],
  Japan: ["images/images/japan1.jpeg","images/images/japan4.jpeg","images/images/japan3.jpeg","images/images/japan7.jpeg","images/images/japan5.jpeg"],
  Bali: ["images/images/Bali1.jpeg","images/images/Bali2.jpeg","images/images/Bali3.jpeg","images/images/Bali4.jpeg","images/images/Bali5.jpeg"],
  Thailand: ["images/images/thai1.jpeg","images/images/thai2.jpeg","images/images/thai3.jpeg","images/images/thai4.jpeg","images/images/thai5.jpeg"],
  Switzerland: ["images/images/swit1.jpeg","images/images/swit2.jpeg","images/images/swit3.jpeg","images/images/swit4.jpeg","images/images/swit5.jpeg"],
  Nepal: ["images/images/nep1.jpeg","images/images/nep2.jpeg","images/images/nep3.jpeg","images/images/nep4.jpeg","images/images/nep5.jpeg"],
  Maldives: ["images/images/mal1.jpeg","images/images/mal2.jpeg","images/images/mal3.jpeg","images/images/mal4.jpeg","images/images/mal5.jpeg"],
  Rome: ["images/images/rome6.jpeg","images/images/rome7.jpeg","images/images/rome3.jpeg","images/images/rome4.jpeg","images/images/rome5.jpeg"],
};


function populateSlider(city) {
  const slidesContainer = document.querySelector(".slides");
  if (!slidesContainer) return;
  slidesContainer.innerHTML = "";
  const images = cityImages[city] || [];
  images.forEach((url, i) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = `${city} Image ${i + 1}`;
    slidesContainer.appendChild(img);
  });
}

let slideIndex = 0;
function startSlider() {
  const slides = document.querySelectorAll(".slides img");
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
  const numPeopleInput = document.getElementById("num-people");
  const roomTypeSelect = document.getElementById("room-type");

  const cbBreakfast = document.getElementById("opt-breakfast");
  const cbDinner = document.getElementById("opt-dinner");
  const cbTour = document.getElementById("opt-tour");
  const cbTransport = document.getElementById("opt-transport");

  const adjustModal = document.getElementById("adjustModal");
  const bookingModal = document.getElementById("bookingModal");
  const infoModal = document.getElementById("infoModal");
  const securityModal = document.getElementById("securityModal");
  const congratsModal = document.getElementById("congratsModal");

  const adjustCloseBtn = adjustModal.querySelector(".close");
  const doneBtn = adjustModal.querySelector(".update-btn");
  const bookingCloseBtn = bookingModal.querySelector(".close");
  const bookBtn = document.querySelector(".book-btn");
  const bookConfirmBtn = bookingModal.querySelector(".book-confirm");
  const infoSubmitBtn = infoModal ? infoModal.querySelector(".submit-info") : null;
  const securityConfirmBtn = securityModal ? securityModal.querySelector(".final-ok") : null;
  const congratsOkBtn = congratsModal.querySelector(".congrats-ok");

  const confirmCity = document.getElementById("city-name-confirm");
  const confirmDays = document.getElementById("confirm-days");
  const confirmStart = document.getElementById("confirm-start");
  const confirmEnd = document.getElementById("confirm-end");
  const confirmPeople = document.getElementById("confirm-people");
  const confirmRoom = document.getElementById("confirm-room");
  const confirmCost = document.getElementById("confirm-cost");
  const confirmServices = document.getElementById("confirm-services");

  
  cityNameEl.innerText = `${city} Tour Package`;
  adjustDaysInput.value = defaultDays;
  daysEl.innerText = defaultDays;
  populateSlider(city);
  startSlider();
  calculateCost();

 
  function calculateCost() {
    const days = Math.max(1, parseInt(adjustDaysInput.value) || 1);
    const people = Math.max(1, parseInt(numPeopleInput.value) || 1);
    const roomType = roomTypeSelect.value;

    let perDayCost = price * ROOM_COST_MULTIPLIER[roomType];
    perDayCost += cbBreakfast.checked ? SERVICE_COSTS.breakfast : 0;
    perDayCost += cbDinner.checked ? SERVICE_COSTS.dinner : 0;

    let oneTimeCost = 0;
    oneTimeCost += cbTour.checked ? SERVICE_COSTS.tour : 0;
    oneTimeCost += cbTransport.checked ? SERVICE_COSTS.transport : 0;

    const total = perDayCost * days * people + oneTimeCost;

    priceEl.innerText = perDayCost.toFixed(2);
    daysEl.innerText = days;
    totalCostEl.innerText = total.toFixed(2);

    const servicesList = document.getElementById("services-list");
    servicesList.innerHTML = "";
    const liHotel = document.createElement("li");
    liHotel.textContent = `Hotel: The Taj Palace (${days} nights)`;
    servicesList.appendChild(liHotel);
    if (cbBreakfast.checked) servicesList.appendChild(newListItem("Breakfast"));
    if (cbDinner.checked) servicesList.appendChild(newListItem("Dinner"));
    if (cbTour.checked) servicesList.appendChild(newListItem("City Tour & Guidance"));
    if (cbTransport.checked) servicesList.appendChild(newListItem("Airport Transport"));
  }

  function newListItem(text) {
    const li = document.createElement("li");
    li.textContent = `Includes: ${text}`;
    return li;
  }

  [
    adjustDaysInput,
    numPeopleInput,
    roomTypeSelect,
    cbBreakfast,
    cbDinner,
    cbTour,
    cbTransport,
  ].forEach((el) => {
    el.addEventListener("input", calculateCost);
    if (el.type === "checkbox") el.addEventListener("change", calculateCost);
  });


  document.querySelectorAll(".adjust-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      adjustModal.classList.add("show");
      adjustModal.classList.remove("hide");
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

  
  bookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    confirmCity.textContent = city;
    confirmDays.textContent = adjustDaysInput.value;
    confirmStart.textContent = adjustStartInput.value ? new Date(adjustStartInput.value).toDateString() : "Not selected";
    const endDate = adjustStartInput.value ? new Date(adjustStartInput.value) : null;
    if (endDate) {
      endDate.setDate(endDate.getDate() + parseInt(adjustDaysInput.value));
      confirmEnd.textContent = endDate.toDateString();
    } else confirmEnd.textContent = "Not calculated";
    confirmPeople.textContent = numPeopleInput.value;
    confirmRoom.textContent = roomTypeSelect.value.charAt(0).toUpperCase() + roomTypeSelect.value.slice(1);
    confirmCost.textContent = totalCostEl.innerText;

    confirmServices.innerHTML = "";
    if (cbBreakfast.checked) confirmServices.appendChild(newListItem("Breakfast"));
    if (cbDinner.checked) confirmServices.appendChild(newListItem("Dinner"));
    if (cbTour.checked) confirmServices.appendChild(newListItem("City Tour & Guidance"));
    if (cbTransport.checked) confirmServices.appendChild(newListItem("Airport Transport"));

    bookingModal.classList.add("show");
    bookingModal.classList.remove("hide");
  });
  function closeBookingModal() {
    bookingModal.classList.remove("show");
    bookingModal.classList.add("hide");
  }
  bookingCloseBtn.addEventListener("click", closeBookingModal);


  bookConfirmBtn.addEventListener("click", () => {
    closeBookingModal();
    if (infoModal) {
      infoModal.classList.add("show");
      infoModal.classList.remove("hide");
    }
  });

 
  if (infoSubmitBtn) {
    infoSubmitBtn.addEventListener("click", () => {
      infoModal.classList.remove("show");
      infoModal.classList.add("hide");
      if (securityModal) {
        securityModal.classList.add("show");
        securityModal.classList.remove("hide");
      }
    });
  }

 
  if (securityConfirmBtn) {
    securityConfirmBtn.addEventListener("click", () => {
      securityModal.classList.remove("show");
      securityModal.classList.add("hide");
      congratsModal.classList.add("show");
      congratsModal.classList.remove("hide");
    });
  }

 
  congratsOkBtn.addEventListener("click", () => {
    congratsModal.classList.remove("show");
    congratsModal.classList.add("hide");
  });

  
  window.addEventListener("click", (e) => {
    if (e.target === adjustModal) closeAdjustModal();
    if (e.target === bookingModal) closeBookingModal();
    if (infoModal && e.target === infoModal) { infoModal.classList.remove("show"); infoModal.classList.add("hide"); }
    if (securityModal && e.target === securityModal) { securityModal.classList.remove("show"); securityModal.classList.add("hide"); }
    if (e.target === congratsModal) congratsModal.classList.remove("show");
  });

 
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (adjustModal.classList.contains("show")) closeAdjustModal();
      if (bookingModal.classList.contains("show")) closeBookingModal();
      if (infoModal && infoModal.classList.contains("show")) { infoModal.classList.remove("show"); infoModal.classList.add("hide"); }
      if (securityModal && securityModal.classList.contains("show")) { securityModal.classList.remove("show"); securityModal.classList.add("hide"); }
      if (congratsModal.classList.contains("show")) congratsModal.classList.remove("show");
    }
  });

  
  document.querySelector(".back-arrow").addEventListener("click", (e) => {
    e.preventDefault();
    window.history.back();
  });
});
