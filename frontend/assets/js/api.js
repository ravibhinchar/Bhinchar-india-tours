
const API_URL = 'http://localhost:5001/api/tours';

// Fetch and display tours
async function fetchTours() {
  try {
    const response = await fetch(API_URL);
    const tours = await response.json();

    const packageList = document.querySelector('.package-list');
    if (packageList && tours.length > 0) {
      packageList.innerHTML = ''; // Clear hardcoded content

      tours.forEach(tour => {
        const tourCard = `
                 <li>
                  <div class="package-card">

                    <figure class="card-banner">
                      <img src="${tour.image}" alt="${tour.title}" loading="lazy">
                    </figure>

                    <div class="card-content">

                      <h3 class="h3 card-title">${tour.title}</h3>

                      <p class="card-text">
                        ${tour.description}
                      </p>

                      <ul class="card-meta-list">

                        <li class="card-meta-item">
                          <div class="meta-box">
                            <ion-icon name="time"></ion-icon>

                            <p class="text">${tour.duration}</p>
                          </div>
                        </li>

                        <li class="card-meta-item">
                          <div class="meta-box">
                            <ion-icon name="people"></ion-icon>

                            <p class="text">pax: 10</p>
                          </div>
                        </li>

                        <li class="card-meta-item">
                          <div class="meta-box">
                            <ion-icon name="location"></ion-icon>

                            <p class="text">${tour.destination}</p>
                          </div>
                        </li>

                      </ul>

                    </div>

                    <div class="card-price">

                      <div class="wrapper">

                        <p class="reviews">(${tour.reviews} reviews)</p>

                        <div class="card-rating">
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>
                        </div>

                      </div>

                        $${tour.price}
                        <span>/ per person</span>
                      </p>

                      <button class="btn btn-secondary" onclick="handleBooking('${tour._id}', '${tour.title}')">Book Now</button>

                    </div>

                  </div>
                </li>
                `;
        packageList.insertAdjacentHTML('beforeend', tourCard);
      });
    }

  } catch (error) {
    console.error('Error fetching tours:', error);
  }
}

// Handle Booking Logic
window.handleBooking = function (tourId, tourTitle) {
  const token = localStorage.getItem('token');

  if (!token) {
    // User not logged in
    const confirmLogin = confirm("You need to login to book a tour. Go to login page?");
    if (confirmLogin) {
      window.location.href = 'login.html';
    }
  } else {
    // User is logged in
    // Ideally, call a booking API here. For now, show success.
    alert(`Great choice! You have successfully started the booking process for "${tourTitle}". \n\n(This is a demo. Backend booking integration would happen here.)`);
  }
};

// Check Auth State for Header
function checkAuthState() {
  const token = localStorage.getItem('token');
  const loginBtn = document.getElementById('loginBtn');

  if (token && loginBtn) {
    loginBtn.textContent = 'My Profile';
    loginBtn.href = 'profile.html';
    loginBtn.classList.remove('btn-primary');
    loginBtn.classList.add('btn-secondary'); // Make it stand out or fit in
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchTours();
  checkAuthState();
});
