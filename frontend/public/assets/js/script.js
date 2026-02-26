'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

/**
 *   Tour destination autocomplete
 * - fetches /assets/cities.json
 * - shows A-Z filter buttons
 * - shows suggestions on input or A-Z button click
 */



 const input = document.getElementById("destination");
  const suggestionBox = document.getElementById("suggestions");

  input.addEventListener("input", async function () {
    const query = this.value.trim();
    if (!query) {
      suggestionBox.style.display = "none";
      return;
    }

    try {
      const url = `https://api.locationiq.com/v1/autocomplete?key=pk.adef84800edb412067087fa0e3f687e6&q=${encodeURIComponent(query)}&limit=5`;
      const res = await fetch(url);
      const data = await res.json();

      suggestionBox.innerHTML = "";

      if (data.length > 0) {
        data.forEach(place => {
          const li = document.createElement("li");
          li.textContent = place.display_name;
          li.addEventListener("click", () => {
            input.value = place.display_name;
            suggestionBox.style.display = "none";
          });
          suggestionBox.appendChild(li);
        });
        suggestionBox.style.display = "block";
      } else {
        suggestionBox.style.display = "none";
      }
    } catch (err) {
      console.error("API error:", err);
      suggestionBox.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".input-wrapper")) {
      suggestionBox.style.display = "none";
    }
  });

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});