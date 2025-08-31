const searchToggle = document.getElementById("searchToggle");
const searchForm = document.getElementById("searchForm");

searchToggle.addEventListener("click", () => {
  searchForm.classList.toggle("active");
});

const formbtn = document.getElementById("login-btn");
const loginForm = document.querySelector(".login-form");
const overlay = document.getElementById("overlay");
const formclose = document.getElementById("form-close");

formbtn.addEventListener("click", () => {
    loginForm.style.display = "block";
    overlay.style.display = "block";
});

formclose.addEventListener("click", () => {
    loginForm.style.display = "none";
    overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
    loginForm.style.display = "none";
    overlay.style.display = "none";
});


const menu = document.getElementById("menuBar");
const icons = document.querySelector(".icons");

menu.addEventListener("click", () => {
    icons.classList.toggle("show");
});



let videoBtn = document.querySelectorAll(".vidBtn");
let videoSlider = document.querySelector("#video-slider");
let currentIndex = 0;


let firstSrc = document.querySelector(".vidBtn.active").getAttribute("data-src");
videoSlider.src = firstSrc;

videoBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    changeVideo(index);
  });
});

function changeVideo(index) {
  document.querySelector(".controls .active").classList.remove("active");
  videoBtn[index].classList.add("active");
  let src = videoBtn[index].getAttribute("data-src");
  videoSlider.src = src;
  currentIndex = index; 
}


setInterval(() => {
  let nextIndex = (currentIndex + 1) % videoBtn.length;
  changeVideo(nextIndex);
}, 3000);

const sliders = document.querySelectorAll(".box .slider");

sliders.forEach(slider => {
  const images = slider.querySelectorAll("img");
  let current = 0;
  let interval;

  function startSlider() {
    interval = setInterval(() => {
      images[current].classList.remove("active");
      current = (current + 1) % images.length;
      images[current].classList.add("active");
    }, 1000); 
  }

  function stopSlider() {
    clearInterval(interval);
  }

 
  images[current].classList.add("active");

 
  slider.parentElement.addEventListener("mouseover", startSlider);
  slider.parentElement.addEventListener("mouseout", stopSlider);
});
