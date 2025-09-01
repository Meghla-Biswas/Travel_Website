// Blog Section - optional interactive feature
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-grid img");

  images.forEach(img => {
    img.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.classList.add("img-overlay");

      const enlarged = document.createElement("img");
      enlarged.src = img.src;

      overlay.appendChild(enlarged);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => {
        overlay.remove();
      });
    });
  });
});






var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  loop: true,
  speed: 3000, // smooth speed (ms)
  autoplay: {
    delay: 0,  // no delay, continuous
    disableOnInteraction: false,
  },
  slidesPerView: "auto", // auto fit slides
  freeMode: true, // free sliding
  freeModeMomentum: false, // no sudden stop
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});  



document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  if (name && email && phone && subject && message) {
    alert("✅ Thank you " + name + "! Your message has been sent successfully.");
    document.getElementById("contactForm").reset();
  } else {
    alert("⚠️ Please fill in all fields before submitting.");
  }
})




